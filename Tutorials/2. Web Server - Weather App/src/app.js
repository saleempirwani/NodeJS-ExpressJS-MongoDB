const path = require('path')
const express = require("express");

const app = express();

const PORT = 3000;
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

app.get("/", (req, res) => {
  res.send("<h1>Hello Express!</h1>");
});

app.get("/about", (req, res) => {
  res.send("Hello About!");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is forecast today.",
    location: "Karachi.",
  });
});

app.get("*", (req, res) => {
  res.send("Error");
});

app.listen(PORT, () =>
  console.log(`Listen at ${PORT}. http://localhost:${PORT}`)
);
