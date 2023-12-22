const express = require("express");
const isAuth = require("../middleware/is-auth");
const User = require("../schema/userSchema");

const router = express.Router();

router.get("/homepage", isAuth, (req, res, next) => {
  const sections = ["frontend", "backend"];
  return res.json({
    title: "homepage-sections",
    data: sections,
  });
});

router.post("/profile", isAuth, async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({
    email: username,
  });

  if (!user) {
    return res.status(401).json({
      status: false,
      message: "User not found. Please signup.",
    });
  }

  return res.json({
    name: user.name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    company: user.company,
  });
});

module.exports.routes = router;
