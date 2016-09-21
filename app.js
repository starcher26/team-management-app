var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');

// Adding and use "teams" routes
var teams = require('./routes/teams');
var members = require('./routes/members');
var showteams = require('./routes/showteams');
var showmembers = require('./routes/showmembers');

// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
// mongoose.connect('mongodb://localhost/ManagementTeamApp')
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));


var app = express();

var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/ManagementTeamApp';
} else {
  MONGO_DB = 'mongodb://localhost/ManagementTeamApp';
}

mongoose.connect(MONGO_DB, function (err, db) {
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("connection successful");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.use('/', routes);
app.use('/teams', teams);
app.use('/showteams', showteams);
app.use('/members', members);
app.use('/showmembers', showmembers);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/upload', function(req, res) {
  console.log(req.body);
  var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
        cb(null, './photos/')
      },
      filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        
      }
  });

  var upload = multer({ //multer settings
    storage: storage
  }).single('file');
  upload(req,res,function(err){
    if(err){
      console.log('ERROR');
      console.log(err);
      res.json({error_code:1,err_desc:err});
      return;
    }

    res.json({error_code:0,err_desc:null, file: req.file});
    
  })

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
