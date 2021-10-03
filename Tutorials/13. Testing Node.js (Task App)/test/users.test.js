const request = require("supertest");
const app = require("../src/app");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");
const User = require("../src/models/user");

beforeEach(setupDatabase);

test("Should user create", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Saleem",
      email: "saleem@gmail.com",
      password: "Saleem123",
    })
    .expect(201);

  // Assertion that the database was changed correctly
  let userData = null;
  const user = await User.findById(
    response.body.user._id,
    function (err, docs) {
      if (!err) {
        userData = docs;
      }
    }
  );
  expect(user).not.toBeNull();

  // assertions about response
  expect(response.body).toMatchObject({
    user: {
      name: "Saleem",
      email: "saleem@gmail.com",
    },
    token: userData.tokens[0].token,
  });

  expect(userData).not.toBe("Saleem123");
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
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  let userData = null;
  const user = await User.findById(userOneId, function (err, doc) {
    if (!err) {
      userData = doc;
    }
  });

  expect(user).not.toBeNull();
  expect(response.body.token).toBe(userData.tokens[1].token);
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

test("Should update field", async () => {
  await request(app)
    .patch("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Ali" })
    .expect(200);

  let userData = null;
  await User.findById(userOneId, (err, doc) => {
    if (!err) {
      userData = doc;
    }
  });

  expect(userData.name).toEqual("Ali");
});

test("Should update invalid field", async () => {
  await request(app)
    .patch("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ height: 5 })
    .expect(400);

  let userData = null;
  await User.findById(userOneId, (err, doc) => {
    if (!err) {
      userData = doc;
    }
  });
});

test("Should delete auth user", async () => {
  await request(app)
    .delete("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should delete user", async () => {
  await request(app).delete("/users").send().expect(401);
});

// test("Should user upload avatar", async () => {
//   await request(app)
//     .post("/users/avatar")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .attach("avatar", "tests/fixtures/profile.png")
//     .expect(400);

//   let userData = null;
//   await User.findById(userOneId, (err, doc) => {
//     if (!err) {
//       userData = doc;
//     }
//   });

//   expect(userData.avatar).toEqual(expect.any(Buffer));
// });
