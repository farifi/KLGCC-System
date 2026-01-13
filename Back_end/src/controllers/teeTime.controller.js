const { getConnection } = require("../config/db.js");
const oracledb = require("oracledb");

exports.teeTimeList = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT TEE_TIME_ID, COURSE_ID, START_TIME, END_TIME, AVAILABLE_SLOTS FROM TEE_TIME`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.status(200).json({ teeTimes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};
