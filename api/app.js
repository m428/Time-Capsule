'use strict'
///// require express packages
let express = require('express');
let app = express();
let expressJWT = require('express-jwt');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let logger = require('morgan');
let path = require('path');
let config = require('./config');
let user = require('./routes/user_routes');
let server = require('http').createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// todo: require angular
app.use('/', express.static(__dirname + '/public'));

///// connect database
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/time-capsule');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('database connected');
});

///// require routes
app.get('/', function(req, res) { // test
  res.send('hit test route');
});

// let userRoutes = require('./routes/user_routes');
// app.use('/user', user);

///// set server and port
app.set('port', 3000);
server.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
