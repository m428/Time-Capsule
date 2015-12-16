'use strict'

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let expressJWT = require('express-jwt');
let cache = require('../controllers/cache_controller');
let config = require('../config');
let secret = config.secret;

router.route('/caches')

///// GET all caches
.get(cache.showAllCaches)

///// POST new cache
.post(cache.createCache)


module.exports = router;
