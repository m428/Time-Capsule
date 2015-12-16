'use strict'

let jwt = require('jsonwebtoken');
let express = require('express');
let Cache = require('../models/Cache');
let router = express.Router();
let expressjwt = require('express-jwt');
let app = express();
let config = require('../config'); //  require config file to get secret - move to bash profile
app.set('soSecret', config.secret); // set secret variable
// let routes = require('../routes/cache_routes');

function showAllCaches(req, res) {
  Cache.find({}, function(err, users) {
    console.log('hit /caches/show')
    res.send(caches);
  });
}


function createCache(req, res) {
  let cacheObj = new Cache(req.body);
  cachObj.save(function(err) {
    if(err) {
      res.send(err);
    } else {
      return res.status(200).send(cache);
    }
    console.log(cache);
  });
}






module.exports = {
  showAllCaches: showAllCaches,
  createCache: createCache,
}
