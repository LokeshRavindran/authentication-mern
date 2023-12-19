const express = require("express");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/homepage", isAuth, (req, res, next) => {
  const sections = ["frontend", "backend"];
  return res.json({
    title: "homepage-sections",
    data: sections,
  });
});

module.exports.routes = router;
