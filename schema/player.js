var mongoose = require('mongoose')
var schema = mongoose.Schema

var playerSchema = new schema({
    //_uid: schema.Types.ObjectId,
    name: String,
    dob: Date,
    goals: Number,
    matches: Number,
    height: Number,
    weight: Number
})


