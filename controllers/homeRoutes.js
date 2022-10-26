const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
