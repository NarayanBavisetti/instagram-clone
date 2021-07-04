const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("no bro");
});

router.post("/signup", (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  if (!email || !name || !password || !confirmpassword) {
    return res.status(400).json({ error: "Please fill all the details" });
  } else if (password.length < 3) {
    return res.status(400).json({ error: "passwords lenght is less than 3" });
  } else if (password !== confirmpassword) {
    return res.status(400).json({ error: "passwords does not match" });
  }
  User.findOne({ email: email }).then((response) => {
    if (response) {
      return res.status(400).json({ error: "user already exists" });
    }
    bcrypt.hash(password, 12).then((hashed) => {
      const user = new User({
        name,
        email,
        password: hashed,
      });

      user.save().then(() => {
        res.status(200).json({ msg: "signup successfull" });
      });
    });
  });
  //   console.log(req.body);
  //   res.status(200).json({ msg: "signup successfull" });
});

module.exports = router;
