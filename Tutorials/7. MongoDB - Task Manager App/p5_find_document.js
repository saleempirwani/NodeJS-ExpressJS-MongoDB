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

  // SEARCHING FROM A COLLECTION
  col.findOne(
    { _id: new ObjectId("60fae58e2cf04248381a6de0") },
    (err, user) => {
      if (err) return console.log("Unable to find user.");

      console.log(user);
    }
  );

  col.find({ name: "Yousuf" }).toArray((err, users) => {
    if (err) console.log(err);

    console.log(users);
  });
});
