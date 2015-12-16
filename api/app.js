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
let server = require('http').createServer(app);
let userRoutes = require('./routes/user_routes');
let cacheRoutes = require('./routes/cache_routes');
let methodOverride  = require('method-override');
let cors = require('cors');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // may need false
app.use('/', express.static(__dirname + '/frontend'));
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

///// connect database
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/time-capsule');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('database connected');
});

///// require routes
app.use(userRoutes);
app.use(cacheRoutes);

// require('./routes/cache_routes.js')(app); // - errors - probably don't need for maps


///// set server and port
app.set('port', 3000);
server.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
