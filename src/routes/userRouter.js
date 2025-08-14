const {
  renderLogInForm,
  createUserGet,
  createUserPost,
} = require("../controllers/userController");
const passport = require("passport");
const { Router } = require("express");
const userRouter = Router();

userRouter.get("/log-in", renderLogInForm);

userRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

userRouter.get("/sign-up", createUserGet);

userRouter.post("/sign-up", createUserPost);

module.exports = userRouter;
