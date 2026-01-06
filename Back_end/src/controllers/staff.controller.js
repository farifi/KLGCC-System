const { getConnection } = require('../config/db.js');
const oracledb = require('oracledb');


exports.staffList = async (req, res) => {
    let conn;

    try {
        conn = await getConnection();

        const staffList = await conn.execute(
            `SELECT STAFF_ID, FULL_NAME, EMAIL, PHONE FROM STAFF`, [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (staffList.rows.length === 0 ){
            return res.status(200).json({ message: "No record currently in the database"});
        }

        res.status(201).json({ staffs: staffList.rows });

    } catch (err) {
        console.error('Signup error:', err);
        if (!res.headerSent) {
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
};

exports.deleteStaff = async (req, res) => {
    const { id } = req.params; 
    
    if (!id) return res.status(400).json({ message: 'Staff ID is required' });

    let conn;
    try {
        conn = await getConnection();
        result = await conn.execute(
            `DELETE FROM STAFF WHERE STAFF_ID = ${id}`, [],
            { autoCommit: true }
        );

        console.log(result);

        if (result.rowsAffected === 0){
            return res.status(404).json({ message: 'Staff not found' });
        } 

        res.status(200).json({ message: "Staff deleted successfully"});
        
    } catch (error) {
        console.error('Signup error:', error);
        if (!res.headerSent) {
            res.status(500).json({ message: "Server error", error: error.message });
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
};

exports.updateStaff = async (req, res) => {
    const { id } = req.params; 
    const { FULL_NAME, EMAIL, PHONE } = req.body;
    
    if (!id) return res.status(400).json({ message: 'Staff ID is required' });

    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute(
            `UPDATE STAFF SET FULL_NAME = :name, EMAIL = :email, PHONE = :phone 
             WHERE STAFF_ID = :id`, 
             {name: FULL_NAME, email: EMAIL, phone: PHONE, id: id},
             {autoCommit: true}
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.status(200).json({ message: "Staff updated successfully" })
        
    } catch (error) {
        console.error('Signup error:', error);
        if (!res.headerSent) {
            res.status(500).json({ message: "Server error", error: error.message });
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
};