// Dependencies
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();


// Sets the connection to MongoDB
mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/timeCapsule");

// Logging and Parsing
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// Routes
require('./app/routes.js')(app);

// Listen
// app.listen(port);
// console.log('App listening on port ' + port);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
