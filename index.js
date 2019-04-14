const express = require("express")
var app = express()
const mongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const port = process.env.PORT || 1337
var assert = require('assert')
const bodyparser = require('body-parser')
const html = require('http')


const player = require('./routes/player')
const league = require('./routes/league')
const errorHandler = require('./middleware/errorhandler')

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

/*
process.on('uncaughtException', (err)=> {
    console.error('There was an uncaught error')
    process.exit(1)
})
*/

/*app.use(function(err,req,res,next){
    res.status(500).send('Error processing request.'+ err)
})*/

app.use(errorHandler)

app.listen(port, () => {
    console.log("Server running on port", port)
}); 

module.exports = app