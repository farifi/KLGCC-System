const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../config/db.js');
const oracledb = require('oracledb');

// In a real app, store refresh tokens in DB or a dedicated store.
const refreshTokens = new Map(); // key: refreshToken, value: { id, email, name, role }

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dev_access_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "dev_refresh_secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const signAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
};

const signRefreshToken = (user) => {
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
    refreshTokens.set(token, user);
    return token;
};

exports.signup = async (req, res) => {
    const { full_name, email, phone_number, password } = req.body;
    let conn;

    try{
        conn = await getConnection();

        const isStaff = email.endsWith('@klgcc.com');
        const table = isStaff ? 'STAFF' : 'CUSTOMER';
        const idColumn = isStaff ? 'STAFF_ID' : 'CUSTOMER_ID';
        
        // if email already exists
        const existing = await conn.execute(
            `SELECT ${idColumn} FROM ${table} WHERE EMAIL = :email`, [email],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        if (isStaff) {
            await conn.execute(
                `INSERT INTO STAFF (STAFF_ID, FULL_NAME, EMAIL, PHONE, PASSWORD_HASH)
                 VALUES (STAFF_SEQ.NEXTVAL, :full_name, :email, :phone, :password_hash)`,
                 {
                    full_name: full_name,
                    email,
                    phone: phone_number || null,
                    password_hash: passwordHash 
                 },
                 { autoCommit: true }
            );
        } else {
            await conn.execute(
                `INSERT INTO CUSTOMER (CUSTOMER_ID, FULL_NAME, EMAIL, PHONE_NUMBER, PASSWORD_HASH)
                 VALUES (CUSTOMER_SEQ.NEXTVAL, :full_name, :email, :phone, :password_hash)`,
                {
                    full_name: full_name,
                    email,
                    phone: phone_number || null,
                    password_hash: passwordHash
                },
                { autoCommit: true }
            );
        }
        
        res.status(201).json({
            message: `${isStaff ? 'Staff' : 'Customer'} registered successfully`,
            email,
            role: isStaff ? 'staff' : 'customer'
        });

    } catch (err) {
        console.error('Signup error:', err);
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    } finally {
        if (conn) {
            try { await conn.close(); } catch (err) { console.error(err); }
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    let conn;

    try{
        conn = await getConnection();
        
        let query, binds;
        const isStaff = email.endsWith('@klgcc.com');

        if (email.endsWith('@klgcc.com')) {
            // Staff login
            query = `SELECT STAFF_ID, FULL_NAME, EMAIL, PASSWORD_HASH FROM STAFF WHERE EMAIL = :email`;
            binds = [email];
        } else {
            // Customer login
            query = `SELECT CUSTOMER_ID, FULL_NAME, EMAIL, PASSWORD_HASH FROM CUSTOMER WHERE EMAIL = :email`;
            binds = [email];
        }

        const result = await conn.execute(query, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT});

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password"});
        }

        const dbUser = result.rows[0];
        
        const isMatch = await bcrypt.compare(password, dbUser.PASSWORD_HASH);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Build normalized user object for tokens
        const user = {
            id: isStaff ? dbUser.STAFF_ID : dbUser.CUSTOMER_ID,
            email: dbUser.EMAIL,
            name: dbUser.FULL_NAME,
            role: isStaff ? 'staff' : 'customer'
        };

        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user);

        // Send refresh token as HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: `${isStaff ? 'Staff' : 'Customer'} login successful`,
            accessToken,
            user
        });


    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    } finally {
        if (conn) {
            try { 
                await conn.close(); 
            } catch (err) { 
                console.error(err); 
            }
        }
    }
}

exports.logout = (req, res) => {
    const token = req.cookies?.refreshToken;
    if (token) {
        refreshTokens.delete(token);
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
};

exports.refreshToken = (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    if (!refreshTokens.has(token)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            refreshTokens.delete(token);
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const storedUser = refreshTokens.get(token);
        const newAccessToken = signAccessToken(storedUser);

        return res.json({ accessToken: newAccessToken, user: storedUser });
    });
};

exports.protected = (req, res) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        return res.json({
            message: "Protected data",
            user: {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role
            }
        });
    });
};
