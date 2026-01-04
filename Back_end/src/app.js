const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./auth");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use("/api/auth", authRoutes);

module.exports = app;
