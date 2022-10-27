const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

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

    console.log(posts);
    res.render("homepage", {
      posts: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  console.log(req.session.user_id);
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Post,
        },
      ],
    });

    const userPosts = userData.get({ plain: true });
    console.log(userPosts);
    res.render("dashboard", {
      userPosts: userPosts.Post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const userData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
          required: true,
        },
        { model: User, attributes: ["username"] },
      ],
    });

    const userPosts = userData.get({ plain: true });
    console.log(userPosts);
    res.render("post", {
      userPosts: userPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
