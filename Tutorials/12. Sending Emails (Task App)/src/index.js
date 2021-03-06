const express = require("express");
require("./db");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(require("./routers/user"));
app.use(require("./routers/task"));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
