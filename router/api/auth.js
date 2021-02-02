const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../model/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//@route  POST /api/auth/
//@desc   auth user
//@access public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  //simple validation check
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({ msg: "User does not exists" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Please enter valid credentials" });
      }
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

//@route  GET /api/auth/user
//@desc   Get user data
//@access private
router.get("/user", auth, (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
