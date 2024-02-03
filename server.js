const express = require("express");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const { signupValidation, loginValidation } = require("./validation.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.post("/register", signupValidation, (req, res, next) => {
  // your registration code
});

app.post("/login", loginValidation, (req, res, next) => {
  // your login code
});

// Handling Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Running on port ${port} with database`);
    });
  }
});
