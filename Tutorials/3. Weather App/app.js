const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
  return console.error("Please provide address");
}

geocode(address, (error, data) => {
  if (error) {
    return console.error(error);
  }

  console.log(data.location);
  forecast(data.longitude, data.latitude, (error, data) => {
    if (error) {
      return console.error(error);
    }
    console.log(data);
  });
});
