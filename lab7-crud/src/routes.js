const express = require('express')
const Character = require('./models/character')
const router = express.Router()

const characters= require('./controllers/characters')

router.post('/persons',characters.createCharacter)
router.get('/persons',characters.getCharacters)
router.get('/persons/:id',characters.getCharacter)
router.patch('/persons/:id',characters.updateCharacter)
router.delete('/persons/:id',characters.deleteCharacter)

module.exports = router