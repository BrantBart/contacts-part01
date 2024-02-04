const router = require("express").Router();
const passport = require("passport");

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use("/", require("./swagger"));

router.use("/users", require("./users"));
router.use("/foods", require("./foods"));

module.exports = router;
