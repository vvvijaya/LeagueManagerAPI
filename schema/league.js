var mongoose = require('mongoose')
var schema = mongoose.Schema
var types = schema.Types

var leagueSchema = new schema({
    name: String,
    country: String
})

