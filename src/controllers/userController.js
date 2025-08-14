const db = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function renderLogInForm(req, res) {
  res.render("log-in-form");
}

async function createUserGet(req, res) {
  res.render("sign-up-form");
}

async function createUserPost(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.addUser(req.body, hashedPassword);
  res.redirect("/");
}

module.exports = { renderLogInForm, createUserGet, createUserPost };
