const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const pool = require("./db/pool");
const configurePassport = require("./config/passport");
require('dotenv').config();

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use(session({secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
configurePassport(passport, pool);
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on Port: ${PORT}`);
});
