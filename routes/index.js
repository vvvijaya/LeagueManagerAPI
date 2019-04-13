var express = require('express')
var router = express.Router()
var player = require('../routes/player')

router.get('/', (req, res)=>{
  res.send("Server is up and running!"); 
}); 

router.use('/player', player ); 

module.exports = router;