
var express= require('express')
var router = express.Router() 
//var app = express() 
var assert = require('assert')
var mongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose')
var dotenv = require('dotenv').config(); 
var parser = require('body-parser')
var urlParser = parser.urlencoded({extended: true})
var Schema = mongoose.Schema

/*
var leagueSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: Schema.Types.String,
    country: Schema.Types.String
})
*/

//var League = mongoose.model('league', leagueSchema)
//mongoose.set('bufferCommands', false)


router.get('/', (req,res) =>{
    var limitRows = parseInt(req.query.limit) || 0   
    
    /*mongoClient.connect(process.env.DB_CONN, {useNewUrlParser: true}, (err, client) => {
        var limitRows = parseInt(req.query.limit) || 0 
        assert.equal(null, err)
        var db = client.db('LeagueDB')
        var cursor = db.collection('league')
        cursor.find({}, {limit: limitRows}).toArray((err, docs) => {
         assert.equal(null, err) 
         res.json(docs)
         client.close()
        })              
    })*/

    //using promises and error handling in es6 
    mongoClient.connect(process.env.DB_CONN, {useNewUrlParser: true}).then(client => {
        var limitRows = parseInt(req.query.limit) || 0 
        //assert.equal(null, err)
        var db = client.db('LeagueDB')
        var cursor = db.collection('league')
        cursor.find({}, {limit: limitRows})
        .toArray()
        .then((docs) => { 
            res.json(docs)   
            client.close() 
         })           
    }).catch(error => {
        console.log(error)
        res.sendStatus(500)
    })                 
})

router.post('', (req, res) => {
    /*mongoClient.connect(process.env.DB_CONN, {useNewUrlParser: true}, (err, client) => {
            var db = client.db('LeagueDB')            
            db.collection('league').insertOne(
                {
                    "name": req.body.name,
                    "country": req.body.country 
                }, (err, result) => {
                    assert.equal(null, err)
                    res.status(200).send(result.ops)
                }
            )                 
    })*/
    //using promises and error handling in es6 
    mongoClient.connect(process.env.DB_CONN, {useNewUrlParser: true})
    .then(client => {
        var db = client.db('LeagueDB')            
        db.collection('league').insertOne(
            {
                "name": req.body.name,
                "country": req.body.country 
            }
        )                    
    })
    .then(res => {          
        res.sendStatus(200) 
    })    
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })     
})


module.exports = router;