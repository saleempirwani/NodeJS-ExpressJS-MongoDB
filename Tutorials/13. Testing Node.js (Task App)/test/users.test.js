const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Ahmed",
  email: "ahmed@gmail.com",
  password: "$red123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should user create", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Saleem",
      email: "saleem@gmail.com",
      password: "Saleem123",
    })
    .expect(201);
});

test("Should non existence user login", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "hello@gmail.com",
      password: userOne.password,
    })
    .expect(400);
});

test("Should user login", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should get user", async () => {
  await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should get un-auth user", async () => {
  await request(app).get("/users").send().expect(401);
});

test("Should delete un-auth user", async () => {
  await request(app)
    .delete("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should delete user", async () => {
  await request(app).delete("/users").send().expect(401);
});
