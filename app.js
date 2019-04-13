var express = require("express")
var app = express()
var mongoClient = require("mongodb").MongoClient
var mongoose = require("mongoose")
const port = process.env.PORT || 1337
var assert = require('assert')
var bodyparser = require('body-parser')
var routes = require('./routes/index')
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://league-db:60fuD4Q2BG3MZPDmkVkXVkGIGVd3s5het4SCNJgwZjUst3DZl7AHczOtcPW0INxcc3ucTqgjoGKEi7IfF3F4FA%3D%3D@league-db.documents.azure.com:10255/?ssl=true';

//routes 
var player = require('./routes/player')

app.use(bodyparser.json())

//mount routes
app.use("/player", player) 

app.listen(port, () => {
    console.log("Server running on port", port)
});

app.use("", (req, res)=> {
    res.send('home page')
})