const db = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Log in
async function renderLogInForm(req, res) {
  res.render("log-in-form");
}

// Sign up
async function createUserGet(req, res) {
  res.render("sign-up-form");
}

async function createUserPost(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.addUser(req.body, hashedPassword);
  res.redirect("/");
}

// Log out
async function logOut(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/auth/log-in");
  });
}

module.exports = { renderLogInForm, createUserGet, createUserPost, logOut };
