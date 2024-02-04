const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello World");
});

router.get("/login", (req, res, next) => {
  passport.authenticate("github")(req, res, next);
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use("/users", require("./users"));
router.use("/foods", require("./foods"));

module.exports = router;
