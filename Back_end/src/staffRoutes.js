const express = require('express');
const router = express.Router();
const staffController = require('./controllers/staff.controller');

router.get("/staffList", staffController.staffList);

module.exports = router;
