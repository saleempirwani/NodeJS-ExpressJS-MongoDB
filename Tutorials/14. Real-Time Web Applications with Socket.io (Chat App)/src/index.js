const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { getMessages, getLocation } = require("./utils/messages");
const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
} = require("./utils/users");

const PORT = process.env.PORT | 3000;
const publicDirPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// MIDDLEWARE
app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
  console.log("websocket connection");

  // Join in a Room
  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {
      return callback(error);
    }

    // Joining
    socket.join(user.room);

    // Welcome Message
    socket.emit("message", getMessages(`Welcome ${user.username}`));

    // User Joined Message
    socket.broadcast
      .to(user.room)
      .emit("message", getMessages(`${user.username} has joined`));

    // Send room Data
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Send message in a Room
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }

    const user = getUser(socket.id);
    io.to(user.room).emit("message", getMessages(user.username, message));
    callback();
  });

  // Send location in a Room
  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      getLocation(user.username, coords)
    );
    callback();
  });

  // Leave a Room
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        getMessages(`${user.username} has left"`)
      );
      // Send room Data
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);

// socket.emit() - send message to specific user

// io.emit() - send message to all connected user
// socket.broadcast.emit() - send message to all except sender

// io.to(room).emit() - send message all connected users in a room
// socket.to(room).broadcast.emit() - send message to all except se
