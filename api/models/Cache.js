'use strict'
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let CacheSchema = new Schema({
    title: {type: String, required: true},
    blerb: {type: String, required: true},
    photo: {data: Buffer, contentType: String}, // todo: add image/instagram logic and views
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// set created_at current time
CacheSchema.pre('save', function(next){
    let now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// index this schema in 2dsphere format - required for running proximity search
// can query users based on geographic inclusion, intersection, and proximity
CacheSchema.index({location: '2dsphere'});

// set mongoDB collection to be used as: "Cache"
module.exports = mongoose.model('Cache', CacheSchema);
