const express = require("express");
const router = express.Router();
const dashboardController = require('./controllers/dashboard.controller');
const { authenticateToken } = require('./middleware/auth');

router.get("/total-bookings-revenue", dashboardController.totalBookingsRevenue);
router.get("/booking-trends", dashboardController.bookingTrend);   
router.get("/average-booking-price-per-staff", dashboardController.averageBookingPricePerStaff);
router.get("/bookings-by-course", dashboardController.bookingCountByCourse);
router.get("/equipment-usage-count", dashboardController.equipmentUsageCount);   

module.exports = router;
