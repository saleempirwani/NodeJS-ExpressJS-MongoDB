const express = require("express");
require("./db");

const app = express();

app.use(express.json());
app.use(require("./routers/user"));
app.use(require("./routers/task"));

module.exports = app;
