const { MongoClient, ObjectId } = require("mongodb");

const DB_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "taskManager";

// GENERATING OBJECT IDs.
const id = new ObjectId();
console.log("id", id);
console.log("id timestamp", id.getTimestamp());
console.log("id timestamp", id.id);
console.log("id", id.id.length);
console.log("id toHexString", id.toHexString().length);
console.log("id", id.toHexString());

// CONNECTING TO DATABASE
MongoClient.connect(DB_URL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.error(error);
  }
  console.log("Database connected successfully.");

  // CREATE A DATABASE
  const db = client.db(DB_NAME);
});
