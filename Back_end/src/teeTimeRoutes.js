const express = require("express");
const router = express.Router();
const teeTimeController = require("./controllers/teeTime.controller");
const { authenticateToken } = require("./middleware/auth");

router.get("/list", authenticateToken, teeTimeController.teeTimeList);

module.exports = router;
