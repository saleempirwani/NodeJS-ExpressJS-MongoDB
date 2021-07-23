const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoid3Jlc3RsZSIsImEiOiJja3F3Nm5odjQwbDlyMnZwbTVoYmQyOWNwIn0.J1SDR_8xw8NGEiDlFi6MgA&limit=1`;

  request.get({ url, json: true }, (error, response, body) => {
    if (error) {
      callback(error.message, undefined);
    } else if (!response && response.statusCode !== 200) {
      callback(response, undefined);
    } else if (body.features.length === 0) {
      callback(response, undefined);
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, { longitude, latitude, location });
    }
  });
};


module.exports = geocode

