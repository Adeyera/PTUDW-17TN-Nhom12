const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const User = require("../../models/user");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/groups/explore",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/register", function (req, res) {
  let newUser = new User({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/groups/explore");
    });
  });
});

router.get("/register", function (req, res) {
  res.render("register");
});
router.post("/profile/:id", upload.single("picture"), function (req, res) {
  const user = req.body.user;
  var encode_image = "";
  if (req.file) {
    const image = req.file.buffer;
    encode_image = image.toString("base64");
  }
  if (encode_image !== "") {
    user.profile_image = { 
        data : encode_image,
        mimetype :req.file.mimetype
    }
  }
  User.findByIdAndUpdate(req.params.id, user, (error, updatedUser) => {
    if (error) {
      console.log(error);
    }
    else {
      res.redirect("/profile/" + req.params.id)
    }
  } )
});

router.get("/profile/:id", function (req, res) {
  User.findById(req.params.id, (error, user)=>{
    if (error) {
      console.log(error);
    }
    else {
      res.render("profile", {user : user});
    }
  })
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/login");
});

router.get("/", function (req, res) {
  if (req.isAuthenticated()) res.redirect("/groups/explore");
  else res.redirect("/login");
});

module.exports = router;
