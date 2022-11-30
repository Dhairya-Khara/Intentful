const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getOneTranscriptIntentsInteractor = require('../UseCases/GetUseCases/getSpecificIntentsInteractor')

/**
 * Uses {@link getSpecificIntentsInteractor} Use Case to get the
 * intent of the specific transcript the user has requested and
 * sends them to the client side as a response.
 */
router.get('/getOneTranscriptIntents', auth, async (req, res) => {
    const user = req.user
    const name = req.query.name
    const intents = getOneTranscriptIntentsInteractor(user, name)
    res.send(intents)
})

module.exports = router