const express = require("express");
require("./db");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT | 3000;

app.use(express.json());

app.use(require("./routers/user"));
app.use(require("./routers/task"));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
