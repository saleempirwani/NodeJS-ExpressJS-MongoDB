const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Nodejs Course Completed!",
    })
    .expect(201);

  let task = null;
  await Task.findById(response.body._id, (err, doc) => {
    if (!err) {
      task = doc;
    }
  });

  expect(task.description).toEqual("Nodejs Course Completed!");
});

test("Should delete own task", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send();
  expect(200);

  await Task(response.body._id);
  expect(response.body.length).toEqual(2);
});

test("Should delete others task", async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send();
  expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
