const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

// CREATE A NEW USER
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// LOGIN A USER
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: { message: e.message } });
  }
});

// LOGOUT A USER
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: "Logout Successfully" });
  } catch (e) {
    res.status(400).send({ error: { message: e.message } });
  }
});

// LOGOUT ALL DEVICES
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "Logout successfully from all devices" });
  } catch (e) {
    res.status(400).send({ error: { message: e.message } });
  }
});

// GET ALL THE USERS
router.get("/users", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET SPECIFIC USER
router.get("/users", auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// UPDATE SPECIFIC USER
router.patch("/users", auth, async (req, res) => {
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

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    // BY PASS MIDDLEWARE AND DIRECTLY ACCESS DATABASE
    // const user = await User.findByIdAndUpdate(req?.params?.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE SPECIFIC USER
router.delete("/users", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
