const request = require('request');



const forecast = (coordinates , callback) => {
  const Key  = '4434527c45696671cb74d7fc3317bc35';
  const OWurl  = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${Key}`;
  request({url : OWurl , json : true},(error, response, body) => {
    if(error) {
      callback('Unable to connect to the service !',undefined);
    }
    else if(body.main.temp == undefined) {
      callback('coordinates not found !',undefined);
    }
    else {
      callback(undefined , {temp : body.main.temp , name : coordinates.name});
    }
  });
};

module.exports = forecast;
