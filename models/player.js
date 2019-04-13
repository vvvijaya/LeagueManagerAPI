var mongoose = require('mongoose') 
var Schema = mongoose.Schema; 

var playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    team_id: Schema.Types.String, //{type: Schema.Types.ObjectId}, //, ref: Team
    goals: Schema.Types.Number,
    appearances: Schema.Types.Number 
})

//Virtual for player name 
playerSchema
.virtual('name')
.get( ()=> {
    return this._id
})

module.exports = mongoose.model('PlayerModel', playerSchema)
