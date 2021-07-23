const request = require("postman-request");

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2c5dab70c98834c65871a22e8f833506&query=${lng},${lat}`;

  request.get({ url, json: true }, (error, response, body) => {
    if (error) {
      callback(error, undefined);
    } else if (!response && response.statusCode !== 200) {
      callback(response, undefined);
    } else if (!Object.keys(body).includes("current")) {
      callback(body.error.type, undefined);
    } else {
      const { current } = body;
      const data = `${current?.weather_descriptions[0]}: The current temperature is ${current.temperature} degree. It feels like ${current.feelslike} degree`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
