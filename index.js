var express = require("express")
var app = express()
var mongoClient = require("mongodb").MongoClient
var mongoose = require("mongoose")
const port = process.env.PORT || 1337
var assert = require('assert')
var bodyparser = require('body-parser')
var html = require('http')


var player = require('./routes/player')
var league = require('./routes/league')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

//mount routes
app.use("/player", player) 
app.use('/league', league)

app.use("", (req, res)=> {
   // res.render('./views/home.html')
   // res.send('home page')

   res.send(`
   <h2> Home Page </h2>
   <br/>
   <div>
       This is a project that mimics functionality of the popular "Football Manager" game via API. <br/> 
       <br> 
       The Open API spec for this API can be found <a href="https://app.swaggerhub.com/apis/vvvijaya/FootballManager/0.1.2" >HERE</a> <br/> 
       This REST API project is implemented using Node.js, Express, MongoDB(Azure Cosmos DB) and hosted in Azure. <br/>     
      
   </div>
   `)
})

process.on('uncaughtException', (err)=> {
    console.error('There was an uncaught error')
    process.exit(1)
})

app.listen(port, () => {
    console.log("Server running on port", port)
}); 

module.exports = app