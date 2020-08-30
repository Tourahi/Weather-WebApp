const path    = require('path');
const express = require('express');
const hbs     = require('hbs');

//For the weather API and Data
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
// console.log(__dirname);
// console.log(path.join(__dirname , '../public'));


const app = express();
const port = process.env.PORT || 3000;

// Define Paths for express config
const publicDirPath = path.join(__dirname , '../public');
const viewsDirPath  = path.join(__dirname , '../templates/views');
const partialsPath  = path.join(__dirname , '../templates/partials');

// views location && hbs engine
app.set('views', viewsDirPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Static dir to serve
app.use(express.static(publicDirPath));




//app.com
//app.com/help      Routes
////app.com/about
app.get('', function (req, res) {
  res.render('index' , {title : 'Home'});
});

app.get('/about', function (req, res) {
  res.render('about' , {title : 'About'});
});

app.get('/help', function (req, res) {
  res.render('help' , {title : 'Help' , message : 'This is the help page'});
});



app.get('/weather', (req , res) => {
  res.render('weather' , {title : 'Weather' , message : 'This is the weather page'});
});

app.get('/GetWeather', (req , res) => {
  if(!req.query.address) {
    return res.send({
      error : "You must send an address"
    });
  }

  geocode(req.query.address , (err , data) => {
    if(err){
      return res.send({
        error : err
      });
    }
    else {
      forecast(data , (err , result) => {
        if(err) {
          return res.send({
            error : err
          });
        }
        else{
          res.send(
            {
              temp  : result.temp,
              location : result.name
            }
          );
        }
      })
    }
  })
});

app.get('/test' , (req , res) => {
  if(!req.query.key){
    return res.send({
      error : "You must provide the key"
    });
  }

    console.log(req.query);
      res.send({
          prod : []
    });

});

app.get('*' , (red , res) => {
  res.render('notFound' , {message : "404 Page not found." , title : '404'});
});



app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
