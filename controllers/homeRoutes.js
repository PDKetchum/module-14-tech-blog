const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/", async (req, res) => {
  // Renders all existing posts to the homepage
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
      logged_in: req.session.logged_in,
      logged_user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  // Finds all posts by a user to render to the dashboard page
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Post,
        },
      ],
    });

    const userPosts = userData.get({ plain: true });
    res.render("dashboard", {
      userPosts: userPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/newpost", withAuth, (req, res) => {
  // Render the new post form when a user clicks to create a new post
  res.render("newPostForm");
});

router.get("/post/:id", withAuth, async (req, res) => {
  // Renders a post to a page by id
  try {
    const userData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
        { model: User, attributes: ["username"] },
      ],
    });

    const userPosts = userData.get({ plain: true });
    res.render("post", {
      userPosts: userPosts,
      logged_in: req.session.logged_in,
      logged_user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/editpost/:id", withAuth, async (req, res) => {
  // Renders a post edit page by id
  try {
    console.log(req.params.id);
    const userData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
        { model: User, attributes: ["username"] },
      ],
    });
    const userPosts = userData.get({ plain: true });
    res.render("editpost", {
      userPosts: userPosts,
      logged_in: req.session.logged_in,
      logged_user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/editcomment/:id", withAuth, async (req, res) => {
  // Renders a comment edit page by id
  try {
    console.log(req.params.id);
    const userData = await Comment.findByPk(req.params.id, {
      include: [{ model: Post, attributes: ["post_id"] }],
      include: [{ model: User, attributes: ["username"] }],
    });
    const userComments = userData.get({ plain: true });
    res.render("editComment", {
      userComments: userComments,
      logged_in: req.session.logged_in,
      logged_user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
