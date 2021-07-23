const request = require("postman-request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2c5dab70c98834c65871a22e8f833506&query=${address}`;
  console.log(url);
  request.get({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to find location. Try other location.", undefined);
    } else if (!response && response.statusCode !== 200) {
      callback("Unable to find location. Try other location.", undefined);
    } else if (!Object.keys(body).includes("current")) {
      callback("Unable to find location. Try other location.", undefined);
    } else {
      const { current } = body;
      const data = {
        forecastData: `${current?.weather_descriptions[0]}: The current temperature is ${current.temperature} degree. It feels like ${current.feelslike} degree`,
        location: body.request.query,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
