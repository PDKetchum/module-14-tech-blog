const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  // find all users
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  // find one user by its `id` value
  try {
    const userData = await User.findByPk(req.params.id, {});

    if (!userData) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  // create a new user
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  // delete a user by its `id` value
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
