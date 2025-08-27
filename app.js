const path = require("node:path");

require("dotenv").config();

const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

// Custom configuration
const initializePassport = require("./config/passport-config");

// Import routers
const authRouter = require("./src/routes/authRouter");
const fileRouter = require("./src/routes/fileRouter");
const {
  isNotAuthenticated,
  isAuthenticated,
} = require("./src/middleware/authMiddleware");
const folderRouter = require("./src/routes/folderRouter");

// App
const app = express();

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Passport
initializePassport(passport);

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

// Gives access to currentUser to all the views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Use routes
app.use("/auth", authRouter);
app.use("/", isAuthenticated, fileRouter);
app.use("/", folderRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log(`app listening to port ${process.env.PORT || 3000}`)
);
