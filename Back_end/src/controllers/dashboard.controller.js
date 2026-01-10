const { getConnection } = require('../config/db.js');
const oracledb = require('oracledb');


exports.dashboard = async (req, res) => {
    // let conn;

    // try {
    //     conn = await getConnection();

    //     const dashboardData = await conn.execute(
    //         ``, [],
    //         { outFormat: oracledb.OUT_FORMAT_OBJECT }
    //     );

    //     if (staffList.rows.length === 0 ){
    //         return res.status(200).json({ message: "No record currently in the database"});
    //     }

    //     res.status(201).json({ staffs: dashboardData.rows });

    // } catch (err) {
    //     console.error('Signup error:', err);
    //     if (!res.headerSent) {
    //         res.status(500).json({ message: "Server error", error: err.message });
    //     }
    // } finally {
    //     if (conn) {
    //         try {
    //             await conn.close(); 
    //         } catch (err) {
    //              console.error(err);
    //         }
    //     } 
    // }
};