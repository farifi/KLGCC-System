const { getConnection } = require("../config/db.js");
const oracledb = require("oracledb");

// router.post("/updateBooking", authenticateToken, bookingController.bookingUpdate);

exports.bookingList = async (req, res) => {
  let conn;

  try {
    conn = await getConnection();
    const bookingList = await conn.execute(
      `SELECT * FROM BOOKING`, // need BookingList sql query,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    if (bookingList.row.length === 0) {
      res.status(201).json({ message: "No record currently in the database" });
    }

    res.status(201).json({ bookingList: bookingList.row });
  } catch {
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

exports.bookingUpdate = async (req, res) => {
  let conn;

  try {
  } catch (error) {
  } finally {
  }
};

exports.addBooking = async (req, res) => {
  let conn;

  try {
  } catch (error) {
  } finally {
  }
};

exports.confirmBooking = async (req, res) => {
  let conn;

  const { bookingID, bookingConfirmation } = req.data;

  try {
    if (bookingConfirmation) {
      res.status(400).json({ message: "booking is already confirmed" });
    }

    conn = await getConnection();

    const bookingList = await conn.execute(
      `
      UPDATE BOOKING
      SET BOOKING_CONFIRMATION = TRUE
      WHERE BOOKING_ID = :bookingID`, // need BookingList sql query,
      [bookingID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    if (bookingList.row.length === 0) {
      res
        .status(201)
        .json({ message: "The booking is not in the database currently" });
    }

    const bookingListConfirmed = await conn.execute(
      `
      UPDATE BOOKING
      SET BOOKING_CONFIRMATION = "CONFIRMED"
      WHERE BOOKING_ID = :bookingID`, // need BookingList sql query,
      [bookingID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    if (!bookingListConfirmed) {
      res.status(400).json({ message: "error booking confirmation" });
    }

    res.status(201).json({ message: "Booking confirmed successfully" });
  } catch {
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

exports.deleteBooking = async (req, res) => {
  let conn;

  try {
  } catch (error) {
  } finally {
  }
};

exports.cancelBooking = async (req, res) => {
  let conn;

  const { bookingID, bookingConfirmation } = req.data;

  try {
    conn = await getConnection();

    const bookingList = await conn.execute(
      `
      UPDATE BOOKING
      SET BOOKING_CONFIRMATION = TRUE
      WHERE BOOKING_ID = :bookingID`, // need BookingList sql query,
      [bookingID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    if (bookingList.row.length === 0) {
      res.status(201).json({ message: "The booking is not in the database" });
    }

    const bookingListConfirmed = await conn.execute(
      `
      UPDATE BOOKING
      SET BOOKING_CONFIRMATION = "CANCELLED"
      WHERE BOOKING_ID = :bookingID`, // need BookingList sql query,
      [bookingID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    if (!bookingListConfirmed) {
      res.status(400).json({ message: "Booking cancellation error" });
    }

    res.status(201).json({ message: "Booking is cancelled" });
  } catch {
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
