const bcrypt = require('bcryptjs');
const { getConnection } = require('../config/db.js');
const oracledb = require('oracledb');

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
            query = `SELECT STAFF_ID, EMAIL, PASSWORD_HASH FROM STAFF WHERE EMAIL = :email`;
            binds = [email];
        } else {
            // Customer login
            query = `SELECT CUSTOMER_ID, EMAIL, PASSWORD_HASH FROM CUSTOMER WHERE EMAIL = :email`;
            binds = [email];
        }

        const result = await conn.execute(query, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT});

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password"});
        }

        const user = result.rows[0];
        
        const isMatch = await bcrypt.compare(password, user.PASSWORD_HASH);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Save session
        req.session.user = {
            id: user.ID,
            email: user.EMAIL,
            name: user.FULL_NAME,
            role: isStaff ? 'staff' : 'customer'
        };
        
        res.json({
            message: `${isStaff ? 'Staff' : 'Customer'} login successful`,
            id: user.ID,
            email: user.EMAIL,
            name: user.FULL_NAME,
            role: req.session.user.role
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
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
};

exports.protected = (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
    res.json({ message: "Protected data", user: req.session.user });
}
