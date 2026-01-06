const express = require('express');
const router = express.Router();
const staffController = require('./controllers/staff.controller');
const { authenticateToken } = require('./middleware/auth');

// All staff routes require JWT authentication
router.get("/staffList", authenticateToken, staffController.staffList);

module.exports = router;
