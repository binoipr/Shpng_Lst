const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../model/userModel");
const jwt = require("jsonwebtoken");

//@route  GET /api/users/
//@desc   Register new user
//@access public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  //simple validation check
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            "process.env.jwtSecret",
            { expiresIn: 3600 },
            function (err, token) {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
