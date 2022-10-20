const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

const router = require("express").Router();

module.exports = router;
