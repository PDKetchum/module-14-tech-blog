const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const locationData = await Post.findAll({ raw: true });
  res.render("homepage");
});

module.exports = router;
