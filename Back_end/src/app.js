const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoutes = require("./auth");
const staffRoutes = require("./staffRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Session is still used for now, but JWT will be the primary auth mechanism.
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);

module.exports = app;
