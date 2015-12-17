var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var UserSchema = new Schema({
    title: {type: String, required: true},
    blerb: {type: String, required: true},
    image: {type: String },
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// set created_at parameter equal to current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// index  schema in 2dsphere format for running proximity searches
UserSchema.index({location: '2dsphere'});


module.exports = mongoose.model('User', UserSchema);
