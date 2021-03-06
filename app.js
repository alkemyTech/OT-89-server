const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const newsRouter = require("./routes/news");
const authRouter = require("./routes/auth");
const contactsRouter = require("./routes/contacts");
const awsRouter = require("./routes/aws");
const categoriesRouter = require("./routes/categories");
const memberRouter = require("./routes/member");
const testimonialRouter = require("./routes/testimonial");
const activitiesRouter = require("./routes/activities");

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/news", newsRouter);
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);
app.use("/aws", awsRouter);
app.use("/categories", categoriesRouter);
app.use("/members", memberRouter);
app.use("/testimonials", testimonialRouter);
app.use("/activities", activitiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
