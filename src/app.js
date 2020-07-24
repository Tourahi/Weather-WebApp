const path    = require('path');
const express = require('express');
const hbs     = require('hbs');

// console.log(__dirname);
// console.log(path.join(__dirname , '../public'));


const app = express();
const port = 3000;

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
  res.send('<h1>weather</h1>');
});

app.get('/help/*' , (req , res) => {
    res.render('notFound' , {message : 'Help Article Not found.' , title : '404'});
});

app.get('*' , (red , res) => {
  res.render('notFound' , {message : "404 Page not found." , title : '404'});
});



app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
