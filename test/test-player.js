var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should();
var server = require('../index')

chai.use(chaiHttp)

describe('GET /players', function(){
    it('should return list of players', function(done){
        chai.request(server)
        .get('/player')                     
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body[0].should.have.property('name')
            res.body[0].should.have.property('goals')
            res.body[0].should.have.property('matches')
            res.body[0].should.have.property('height')
            res.body[0].should.have.property('weight')
            done()
        })
    })

    it('limit parameter test', function(done){
        chai.request(server)
        .get('/player?limit=2')
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.length.should.equal(2)           
            done()
        })
    })
})

describe('GET/Search - /players/find', function(){
    it('find players with min goals of 50', function(done){
        chai.request(server)
        .get('/player/find?mingoals=50')
        .end((err,res)=>{
            res.should.have.status(200)      
            res.body.should.be.a('array')
            res.body[0].should.have.property('goals').gt(49)
            done()       
        })
    })
    it('find players with minMatches of 100', function(done){
       chai.request(server)
       .get('/player/find?minmatches=100')
       .end((err,res)=>{
           res.should.have.status(200)
           res.body.should.be.a('array')
           //expect(res).to.have.all.keys('matches')
           res.body[0].should.have.property('matches').gt(99)
           done()       
       })
    })
})

describe('POST /players', function(done){
    it("create new player", function(done){
        let playerData = {
            "name": "C Ronaldo Jr",
            "dob": "1-1-2009",
            "goals": 289,
            "matches": 2,
            "height": "5'7''",
            "weight": 178
        }
        chai.request(server)
        .post('/player')
        .send(playerData)
        .end((err,res)=>{
            res.should.have.status(200)     
            res.body[0].should.have.property('name')
            res.body[0].should.have.property('dob')
            res.body[0].should.have.property('goals')
            res.body[0].should.have.property('matches')
            res.body[0].should.have.property('height')
            res.body[0].should.have.property('weight')
            done()        
        })
    })
})


describe('DELETE Player', function(){
    it("remove player", function(done){
        const playerData = {
            "_id": "5cb0a3a37431f93664f8af96"
        }

        chai.request(server)
        .delete('/player')
        .send(playerData)
        .end((err, res)=>{
            res.should.have.status(200)
            done() 
        })
    })
})