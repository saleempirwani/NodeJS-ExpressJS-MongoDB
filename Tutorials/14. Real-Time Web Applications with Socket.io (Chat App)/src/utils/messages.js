const getMessages = (username, text) => {
  return { username, text, createdAt: new Date() };
};

const getLocation = (username, coords) => {
  return {
    username,
    url: `https://google.com/maps?q=${coords.lat},${coords.lng}`,
    createdAt: new Date(),
  };
};

module.exports = { getMessages, getLocation };
