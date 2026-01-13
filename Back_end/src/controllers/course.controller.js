const { getConnection } = require("../config/db.js");
const oracledb = require("oracledb");

// GET all courses
exports.getCourseList = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT COURSE_ID, COURSE_NAME, DESCRIPTION, HOLES, DIFFICULTY_LEVEL FROM COURSE`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.status(200).json({ courses: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// CREATE course
exports.createCourse = async (req, res) => {
  const { COURSE_NAME, DESCRIPTION, HOLES, DIFFICULTY_LEVEL } = req.body;
  let conn;
  try {
    conn = await getConnection();
    await conn.execute(
      `INSERT INTO COURSE (COURSE_ID, COURSE_NAME, DESCRIPTION, HOLES, DIFFICULTY_LEVEL)
       VALUES (COURSE_SEQ.NEXTVAL, :name, :desc, :holes, :difficulty)`,
      [COURSE_NAME, DESCRIPTION, HOLES, DIFFICULTY_LEVEL],
      { autoCommit: true }
    );
    res.status(201).json({ message: "Course created successfully", course: req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// UPDATE course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { COURSE_NAME, DESCRIPTION, HOLES, DIFFICULTY_LEVEL } = req.body;
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE COURSE
       SET COURSE_NAME = :name, DESCRIPTION = :desc, HOLES = :holes, DIFFICULTY_LEVEL = :difficulty
       WHERE COURSE_ID = :id`,
      [COURSE_NAME, DESCRIPTION, HOLES, DIFFICULTY_LEVEL, id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update course", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `DELETE FROM COURSE WHERE COURSE_ID = :id`,
      [id],
      { autoCommit: true }
    );
    if (result.rowsAffected === 0) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete course", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};
