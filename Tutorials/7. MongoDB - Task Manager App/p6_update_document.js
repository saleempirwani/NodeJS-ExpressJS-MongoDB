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

  // UPDATE A COLLECTION
  db.collection("users")
    .updateOne(
      {
        _id: new ObjectId("60fc2030a6b47555a9f6ccf1"),
      },
      {
        $set: { name: "Yaseen" },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

    // Update One - Increment field
  db.collection("users")
    .updateOne(
      {
        name: 'Ahmed',
      },
      {
        $inc: { age: 1 },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

    // Update Many
    db.collection('tasks').updateMany(
      {
        completed: false
      },
      {
        $set: { completed: true },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
});
