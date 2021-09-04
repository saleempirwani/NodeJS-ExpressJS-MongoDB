const express = require("express");
const User = require("../models/user");

const router = new express.Router();

// CREATE A NEW USER
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// LOGIN A USER
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: { message: e.message } });
  }
});

// GET ALL THE USERS
router.get("/users", async (req, res) => {
  console.log("Hello ===> ");
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET SPECIFIC USER
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req?.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send(err);
    }
    return res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// UPDATE SPECIFIC USER
router.patch("/users/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "age", "password"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    // IF EXTRA KEY WAS PROVIDED
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const user = await User.findById(req?.params?.id);

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    user.save();

    // BY PASS MIDDLEWARE AND DIRECTLY ACCESS DATABASE
    // const user = await User.findByIdAndUpdate(req?.params?.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE SPECIFIC USER
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).send({ error: { message: "User not found" } });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
