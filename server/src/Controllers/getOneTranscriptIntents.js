const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getSpecificIntentsInteractor = require('../UseCases/GetUseCases/getSpecificIntentsInteractor')

router.get('/getOneTranscriptIntents', auth, async (req, res) => {
    const user = req.user
    const name = req.query.name
    const intents = getSpecificIntentsInteractor(user, name)
    res.send(intents)
})

module.exports = router