const express = require("express");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

const multer = require("multer");
const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter(req, file, cb) {
    console.log(" Hello ========> ", file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload image."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

router.delete("/users/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

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

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      return res.status(404).send();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

module.exports = router;
