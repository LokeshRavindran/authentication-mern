const express = require("express");
const isAuth = require("../middleware/is-auth");
const User = require("../schema/userSchema");
const LikeStatus = require("../schema/likeSchema");

const router = express.Router();

router.get("/homepage", isAuth, async (req, res, next) => {
  const sections = ["frontend", "backend"];
  const likesDataCount = await LikeStatus.countDocuments();

  return res.json({
    title: "homepage-sections",
    data: sections,
    likesCount: likesDataCount,
  });
});

router.post("/profile", isAuth, async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne(
    {
      email: username,
    },
    // mongodb projection to get only the required fields
    {
      name: 1,
      email: 1,
      phone: 1,
      country: 1,
      company: 1,
      likeStatus: 1,
      _id: 0,
    }
  );
  if (user) {
    return res.json(user);
  }
  return res.status(500).json({
    message: "Some error has occured. Please try again after sometime",
  });
});

router.post("/updateLikeStatus", isAuth, async (req, res, next) => {
  const { username, status } = req.body;

  await User.updateOne({ email: username }, { likeStatus: status });
  let likeCollectionResponse = null;
  if (status) {
    likeCollectionResponse = await LikeStatus.create({
      email: username,
      status: status,
    });
    await likeCollectionResponse.save();
  } else {
    likeCollectionResponse = await LikeStatus.deleteOne({
      email: username,
    });
  }

  return res.json({
    status: true,
  });
});

module.exports.routes = router;
