const express = require("express");
const router = express.Router();
const bookingController = require("./controllers/booking.controller");
const { authenticateToken } = require("./middleware/auth");

router.get("/bookingList", authenticateToken, bookingController.bookingList);
router.post(
  "/updateBooking/:id",
  authenticateToken,
  bookingController.bookingUpdate,
);
router.post(
  "/confirmBooking/:id",
  authenticateToken,
  bookingController.confirmBooking,
);
router.post(
  "/deleteBooking/:id",
  authenticateToken,
  bookingController.deleteBooking,
);
router.post("/addBooking", authenticateToken, bookingController.addBooking);

module.exports = router;
