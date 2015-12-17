var mongoose        = require('mongoose');
var User            = require('./model.js');

// open app routes
module.exports = function(app) {

    // GET - all caches from database
    app.get('/users', function(req, res){

        // use schema to run search
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);
            res.json(users); // all users
        });
    });

    // POST - create and save new caches
    app.post('/users', function(req, res){
        console.log("inside post /users")
        // create new cache based on schema and the post body
        var newuser = new User(req.body);
        // save cache
        newuser.save(function(err){
            if(err)
                res.send(err);
            res.json(req.body); // new cache
        });
    });
};
