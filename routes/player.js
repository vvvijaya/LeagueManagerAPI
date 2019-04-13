var express= require('express')
var router = express.Router() 
//var app = express() 
var assert = require('assert')
var mongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose')
var parser = require('body-parser')
var urlParser = parser.urlencoded({extended: true})

router.get('/', (req, res) => {   
    var limitRows = parseInt(req.query.limit) || 0    
    mongoClient.connect(process.env.DB_CONN, {useNewUrlParser: true}, (err, client) => {
       assert.equal(null, err)
       var db = client.db('LeagueDB')
       var cursor = db.collection('players')
       cursor.find({}, {limit: limitRows}).toArray((err, docs) => {
        assert.equal(null, err) 
        res.json(docs)
        client.close()
       })              
   })   
})

router.get('/find', urlParser ,(req, res) => { 
   var minGoals = parseInt(req.query.mingoals) || 0
   var maxGoals = parseInt(req.query.maxgoals) || 10000
   var minMatches = parseInt(req.query.minmatches) || 0
   var maxMatches = parseInt(req.query.maxmatches) || 10000
   
   if(minGoals == null || maxGoals == null || minMatches == null || maxMatches == null)
   res.status(403).send('Invalid parameter values.');   
   mongoClient.connect(process.env.DB_CONN,  (err, client) => {
    assert.equal(null, err)
    var db = client.db('LeagueDB')
    var cursor = db.collection('players')
    cursor.find( {
        goals: { $gte: minGoals , $lte: maxGoals}, 
        matches: { $gte: minMatches, $lte: maxMatches }
    } )
    .toArray((err, docs) => {
     assert.equal(null, err) 
     res.json(docs)
     client.close(); 
    })              
})
})

router.post('/', (req, res) => {
    //console.log('creating player..');
    mongoClient.connect(process.env.DB_CONN,  (err, client) => {
        assert.equal(null, err)
       try{
        var db = client.db('LeagueDB')
        var cursor = db.collection('players')
        db.collection('players').insertOne(
            {
                "name": req.body.name,
                "dob": req.body.dob,
                "goals": req.body.goals,
                "matches": req.body.matches,
                "height": req.body.height,
                "weight": req.body.weight
            }
        ).then( (result) => { 
            res.send( result.insertedCount.toString() + ' player created successfully.') 
            } 
        )
        //res.send("Player created successfully!!")
       }
       catch(e){
           res.sendStatus(500)
       }
    })

})

router.put('/', (req, res) => {
    console.log('creating player..');
    var id = req.body._uid || ''
    var name = req.body.name || ''
    var dob = Date.parse(req.body.dob) || new Date('1/1/1970')
    var goals = parseInt(req.body.goals)  || 0
    var matches = parseInt(req.body.matches) || 0
    var height = parseInt(req.body.height) || 0
    var weight = parseInt(req.body.weight) || 0

    console.log(name, weight);

    if(id == null || name == null)
    assert.fail('Invalid data provided.')

    mongoClient.connect(process.env.DB_CONN,  (err, client) => {
        assert.equal(null, err)
        var db = client.db('LeagueDB')
        db.collection('players').updateOne(
            {  "name" : name
            //,"_id": id 
            },
            { 
                $set: {             
                "dob" : dob,
                "goals" : goals,
                "matches" : matches,
                "height" : height,
                "weight" : weight
            }},{},
            (err, docs) => {
                res.sendStatus(200)
                client.close();
            }
        )        
    })
})

module.exports = router; 