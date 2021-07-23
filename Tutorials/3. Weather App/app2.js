const geocode = require("./utils/geocode");

geocode("Karachi", (error, data) => {
  console.log(error, data);
});
