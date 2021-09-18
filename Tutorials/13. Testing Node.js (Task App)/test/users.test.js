const request = require("supertest");
const app = require("../src/app");

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
