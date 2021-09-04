const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

// CREATE A NEW TASK
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    return res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET ALL THE TASKS
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).send(tasks);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// GET SPECIFIC TASKS
router.get("/tasks/:id", async (req, res) => {
  const id = req?.params?.id;

  try {
    const task = await User.findById(id);
    if (!task) return res.status(404).send();

    res.status(200).send(task);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// UPDATE SPECIFIC TASK
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) return res.status(404).send();

    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE SPECIFIC TASK
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).send({ error: { message: "Task not found" } });
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
