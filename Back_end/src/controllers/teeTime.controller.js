const { getConnection } = require("../config/db.js");
const oracledb = require("oracledb");

// function for Booking
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

// === New: Tee Time list WITH Course Name for frontend ===
exports.teeTimeListWithCourse = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT 
          t.TEE_TIME_ID,
          t.COURSE_ID,
          c.COURSE_NAME,
          t.START_TIME,
          t.END_TIME,
          t.AVAILABLE_SLOTS
       FROM TEE_TIME t
       JOIN COURSE c ON t.COURSE_ID = c.COURSE_ID
       ORDER BY t.TEE_TIME_ID`,
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

// === Create Tee Time ===
exports.createTeeTime = async (req, res) => {
  const { COURSE_ID, START_TIME, END_TIME, AVAILABLE_SLOTS } = req.body;
  let conn;
  try {
    conn = await getConnection();

    await conn.execute(
      `INSERT INTO TEE_TIME (TEE_TIME_ID, COURSE_ID, START_TIME, END_TIME, AVAILABLE_SLOTS)
       VALUES (TEE_TIME_SEQ.NEXTVAL, :courseId, :startTime, :endTime, :slots)`,
      [COURSE_ID, START_TIME, END_TIME, AVAILABLE_SLOTS],
      { autoCommit: true }
    );

    res.status(201).json({ message: "Tee Time created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// === Update Tee Time ===
exports.updateTeeTime = async (req, res) => {
  const { id } = req.params;
  const { COURSE_ID, START_TIME, END_TIME, AVAILABLE_SLOTS } = req.body;
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(
      `UPDATE TEE_TIME
       SET COURSE_ID = :courseId,
           START_TIME = :startTime,
           END_TIME = :endTime,
           AVAILABLE_SLOTS = :slots
       WHERE TEE_TIME_ID = :id`,
      [COURSE_ID, START_TIME, END_TIME, AVAILABLE_SLOTS, id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0)
      return res.status(404).json({ message: "Tee Time not found" });

    res.json({ message: "Tee Time updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// === Delete Tee Time ===
exports.deleteTeeTime = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(
      `DELETE FROM TEE_TIME WHERE TEE_TIME_ID = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0)
      return res.status(404).json({ message: "Tee Time not found" });

    res.json({ message: "Tee Time deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};
