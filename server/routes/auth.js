const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


dotenv.config({path : "../.env"})
const secret = process.env.JWT_SECRET;
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the details" });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
   bcrypt.compare(password, user.password).then((doMatch) => {
    if (doMatch) {
        // res.status(200).json({ msg: "User logged in successfully" });
        const token = jwt.sign({_id:user._id}, secret)
        res.json({token})
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    })
 
  }).catch((err) => {
      console.log(err);
  })
});

module.exports = router;
