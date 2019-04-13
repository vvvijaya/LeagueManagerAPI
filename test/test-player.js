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

describe('/players/find', function(){
    it('find players with min goals of 50', function(done){
        chai.request(server)
        .get('/player/find?mingoals=50')
        .end((err,res)=>{
            res.should.have.status(200)      
            done()       
        })
    })
})