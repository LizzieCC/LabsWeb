const Character = require('../models/character')

const createCharacter = function(req,res){
    const character = new Character(req.body)
    character.save().then(function(){
        return res.send(character)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

const getCharacters = function(req,res){
    Character.find({}).then(function(characters){
        res.send(characters)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

const getCharacter = function(req,res){
    const _id = req.params.id
    Character.findById(_id).then(function(character){
        if(!character){
            return res.status(404).send()
        }
        return res.send(character)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

const updateCharacter = function(req,res){
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','father','mother']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid update, you can only update: ' + allowedUpdates
        })
    }
    Character.findByIdAndUpdate(_id,req.body).then(function(character){
        if(!character){
            return res.status(404).send()
        }
        return res.send(character)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

const deleteCharacter = function(req,res){
    const _id = req.params.id
    Character.findByIdAndDelete(_id).then(function(character){
        if(!character){
            return res.status(404).send()
        }
        return res.send(character)
    }).catch(function(error){
        res.status(505).send(error)
    })
}

module.exports = {
    createCharacter: createCharacter,
    getCharacters: getCharacters,
    getCharacter: getCharacter,
    updateCharacter: updateCharacter,
    deleteCharacter: deleteCharacter
}

