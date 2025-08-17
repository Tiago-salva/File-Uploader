const {
  renderLogInForm,
  createUserGet,
  createUserPost,
  logOut,
} = require("../controllers/authController");
const passport = require("passport");
const { Router } = require("express");
const { isNotAuthenticated } = require("../middleware/authMiddleware");
const authRouter = Router();

// Log in
authRouter.get("/log-in", isNotAuthenticated, renderLogInForm);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/log-in",
  })
);

// Sign up
authRouter.get("/sign-up", isNotAuthenticated, createUserGet);

authRouter.post("/sign-up", createUserPost);

// Log out
authRouter.get("/log-out", logOut);

module.exports = authRouter;
