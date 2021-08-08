const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tasks-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const user = new User({ name: "Ali", age: 'Mike' });
user
  .save()
  .then(() => console.log(user))
//   .catch((err) => console.log(err));

const Task = mongoose.model("Task", {
  description: { type: String },
  completed: { type: Boolean },
});

const task = new Task({
  description: "Eating something",
  completed: false,
});

task
  .save()
  .then(() => console.log(task))
  .catch((err) => console.log(err));
