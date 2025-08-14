const path = require("node:path");

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);

const pool = require("./config/db-config");
const initializePassport = require("./config/passport-config");

// Import routers

const app = express();

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Passport

// Use routes

app.listen(process.env.PORT || 3000, () =>
  console.log(`app listening to port ${process.env.PORT || 3000}`)
);
