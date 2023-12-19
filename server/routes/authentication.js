const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");

const router = express.Router();

// check if the user is present
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    email: username,
  });

  if (!user) {
    return res.status(401).json({
      status: false,
      message: "User not found. Please signup.",
    });
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);

  if (!isPasswordEqual) {
    return res.status(401).json({
      status: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
      phone: user.phone,
    },
    "secretCodeForJwtToEncodeAndDecode",
    { expiresIn: constants.JWT_EXPIRY_TIME }
  );

  return res.status(200).json({
    status: true,
    token: token,
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, phone, password, country, company } = req.body;
    const user = await User.findOne({
      $and: [{ email: email }, { phone: phone }],
    });

    if (user) {
      return res.status(409).json({
        message: "User with Email/Phone already exist.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      country,
      company,
    });
    await newUser.save();
    return res.json({ status: true });
  } catch (err) {
    return next(err);
  }
});

module.exports.routes = router;
