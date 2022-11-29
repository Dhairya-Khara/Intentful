const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getOneTranscriptIntentsInteractor = require('../UseCases/GetUseCases/getOneTranscriptIntentsInteractor')

router.get('/getOneTranscriptIntents', auth, async (req, res) => {
    const user = req.user
    const name = req.query.name
    const intents = getOneTranscriptIntentsInteractor(user, name)
    res.send(intents)
})

module.exports = router