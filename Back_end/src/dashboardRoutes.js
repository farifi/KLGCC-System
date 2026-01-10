const express = require("express");
const router = express.Router();
const dashboardController = require('./controllers/dashboard.controller');
const { authenticateToken } = require('./middleware/auth');

router.get("/booking-trend", authenticateToken, dashboardController.bookingTrend);
router.get("/bookings-by-course", authenticateToken, dashboardController.bookingsByCourse);
router.get("/equipment-usage", authenticateToken, dashboardController.equipmentUsage);
router.get("/customer-types", authenticateToken, dashboardController.customerTypes);
router.get("/staff-by-position", authenticateToken, dashboardController.staffByPosition);
router.get("/top-courses", authenticateToken, dashboardController.topCourses);
router.get("/transactions", authenticateToken, dashboardController.transactions);

module.exports = router;
