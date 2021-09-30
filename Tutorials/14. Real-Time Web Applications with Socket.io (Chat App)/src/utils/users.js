const users = [];

// ADD USER
const addUser = ({ id, username, room }) => {
  username = username?.trim()?.toLowerCase();
  room = room?.trim()?.toLowerCase();

  // Validating the data
  if (!username || !room) {
    return { error: "Username and room is required" };
  }

  // Check if user already exist
  const isUserExist = users.find((user) => {
    return user.username === username && user.room === room;
  });

  if (isUserExist) {
    return { error: "User already exist" };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

// REMOVE USER
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// GET USER
const getUser = (id) => {
  return users.find((user) => user.id === id);
};

// GET ALL USERS IN A ROOM
const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
