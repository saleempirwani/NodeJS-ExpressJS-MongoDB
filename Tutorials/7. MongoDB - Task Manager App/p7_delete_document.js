const { MongoClient, ObjectId } = require("mongodb");

const DB_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "taskManager";

// CONNECTING TO DATABASE
MongoClient.connect(DB_URL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.error(error);
  }
  console.log("Database connected successfully.");

  // CREATE A DATABASE
  const db = client.db(DB_NAME);

  // CREATE A COLLECTIONS
  const col = db.collection("users");

  // DELETE A DOCUMENT
  db.collection("users")
    .deleteMany({ age: 27 })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  db.collection("tasks")
    .deleteOne({ description: "Eating something." })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
