const { MongoClient } = require("mongodb");

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
  console.log('Database Name:', db.databaseName)
});
