const router = require("express").Router();
const { Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  // Find all comments
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  // Find one comment by its `id` value
  try {
    const commentData = await Comment.findByPk(req.params.id, {});

    if (!commentData) {
      res.status(404).json({ message: "No comment with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  // Create a new comment
  try {
    req.body.user_id = req.session.user_id;
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  // Update a comment by its `id` value
  try {
    const result = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404).json({ message: "No comment with this id!" });
      return;
    }
    // Return comment data
    const comment = await Comment.findByPk(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  // Delete a comment by its `id` value
  // First before deletion, store data into a variable
  const comment = await Comment.findByPk(req.params.id, {});
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    // Return the comment data before deletion
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
