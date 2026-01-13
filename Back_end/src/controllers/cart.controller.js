const { getConnection } = require("../config/db.js");
const oracledb = require("oracledb");

// 1️⃣ Simple cart list
exports.getSimpleCart = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT CART_ID, BOOKING_ID, CART_NUMBER, RENTAL_FEE FROM CART`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.status(200).json({ carts: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// 2️⃣ Cart list joined with booking & customer
exports.getCartWithBooking = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `SELECT 
         ca.CART_ID, ca.CART_NUMBER, ca.RENTAL_FEE,
         b.BOOKING_ID, b.BOOKING_DATE,
         cu.CUSTOMER_ID, cu.FULL_NAME AS CUSTOMER_NAME
       FROM CART ca
       JOIN BOOKING b ON ca.BOOKING_ID = b.BOOKING_ID
       JOIN CUSTOMER cu ON b.CUSTOMER_ID = cu.CUSTOMER_ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.status(200).json({ carts: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// 3️⃣ CRUD
exports.createCart = async (req, res) => {
  const { BOOKING_ID, CART_NUMBER, RENTAL_FEE } = req.body;
  let conn;
  try {
    conn = await getConnection();
    await conn.execute(
      `INSERT INTO CART (CART_ID, BOOKING_ID, CART_NUMBER, RENTAL_FEE)
       VALUES (CART_SEQ.NEXTVAL, :bookingId, :cartNumber, :rentalFee)`,
      [BOOKING_ID, CART_NUMBER, RENTAL_FEE],
      { autoCommit: true }
    );
    res.status(201).json({ message: "Cart created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  const { BOOKING_ID, CART_NUMBER, RENTAL_FEE } = req.body;
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `UPDATE CART
       SET BOOKING_ID = :bookingId,
           CART_NUMBER = :cartNumber,
           RENTAL_FEE = :rentalFee
       WHERE CART_ID = :id`,
      [BOOKING_ID, CART_NUMBER, RENTAL_FEE, id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(
      `DELETE FROM CART WHERE CART_ID = :id`,
      [id],
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};
