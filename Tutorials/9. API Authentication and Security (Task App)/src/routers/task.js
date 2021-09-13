const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

// CREATE A NEW TASK
router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    return res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET ALL THE TASKS
router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate("tasks").execPopulate();
    return res.status(200).send(req.user.tasks);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// GET SPECIFIC TASKS
router.get("/tasks/:id", auth, async (req, res) => {
  const id = req?.params?.id;

  try {
    const task = await Task.findOne({ owner: req.user._id, _id: id });

    if (!task) return res.status(404).send();

    res.status(200).send(task);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// UPDATE SPECIFIC TASK
router.patch("/tasks/:id", auth, async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const task = await Task.findOne({
      owner: req.user._id,
      _id: req.params.id,
    });

    if (!task) return res.status(404).send();

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE SPECIFIC TASK
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      owner: req.user._id,
      _id: req.params.id,
    });

    if (!task)
      return res.status(404).send({ error: { message: "Task not found" } });

    res.status(200).send({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
