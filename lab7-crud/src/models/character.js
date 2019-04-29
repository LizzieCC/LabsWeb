const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    born: {
        type: String
    },
    timeline:{
        type: String
    },
    alliegance: {
        type: Array
    },
    playedBy:{
        type:String
    },
    titles:{
        type:Array
    },
    father:{
        type: String
    },
    mother:{
        type: String
    },
    spouse:{
        type: String
    }
})

const Character = mongoose.model('Character',characterSchema)

module.exports = Character