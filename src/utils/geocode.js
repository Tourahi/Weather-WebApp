const request = require('request');


const geocode = (address , callback) => {
  const token  = '';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`

  request({ url : url , json : true} , (error , response , body) => {
    if(error) {
      callback('Unable to connect to the service !',undefined);
    }
    else if(body.features === undefined) {
      callback('Location not found !',undefined);
    }
    else if(body.features.length == 0) {
      callback('Location not found !',undefined);
    }
    else {
      callback(undefined , {
        lat : body.features[0].center[1],
        lon : body.features[0].center[0],
        name : body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
