const { getConnection } = require('../config/db.js');
const oracledb = require('oracledb');


exports.getAllEquipment = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
      SELECT
        e.EQUIPMENT_ID,
        e.EQUIPMENT_TYPE,
        e.FEE,
        b.BOOKING_ID,
        b.BOOKING_DATE,
        b.STATUS,
        c.CUSTOMER_ID,
        c.FULL_NAME AS CUSTOMER_NAME
      FROM EQUIPMENT e
      JOIN BOOKING b ON e.BOOKING_ID = b.BOOKING_ID
      JOIN CUSTOMER c ON b.CUSTOMER_ID = c.CUSTOMER_ID
      ORDER BY e.EQUIPMENT_ID
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
};



exports.createEquipment = async (req, res) => {
  const { BOOKING_ID, EQUIPMENT_TYPE, FEE } = req.body;
  let connection;

  try {
    connection = await getConnection();

    await connection.execute(
      `
      INSERT INTO EQUIPMENT (EQUIPMENT_ID, BOOKING_ID, EQUIPMENT_TYPE, FEE)
      VALUES (EQUIPMENT_SEQ.NEXTVAL, :bookingId, :type, :fee)
      `,
      {
        bookingId: BOOKING_ID,
        type: EQUIPMENT_TYPE,
        fee: FEE
      },
      { autoCommit: true }
    );

    res.status(201).json({ message: "Equipment created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
};


exports.updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { BOOKING_ID, EQUIPMENT_TYPE, FEE } = req.body;
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
      UPDATE EQUIPMENT
      SET BOOKING_ID = :bookingId,
          EQUIPMENT_TYPE = :type,
          FEE = :fee
      WHERE EQUIPMENT_ID = :id
      `,
      {
        bookingId: BOOKING_ID,
        type: EQUIPMENT_TYPE,
        fee: FEE,
        id
      },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json({ message: "Equipment updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
};


exports.deleteEquipment = async (req, res) => {
  const { id } = req.params;
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `DELETE FROM EQUIPMENT WHERE EQUIPMENT_ID = :id`,
      { id },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json({ message: "Equipment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
};
