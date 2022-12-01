const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getIntentsInteractor = require('../UseCases/GetUseCases/getAllIntentsInteractor')

/**
 * Uses {@link getAllIntentsInteractor} Use Case to get all
 * intents of the user and sends them to the client side as a response.
 */
router.get('/getIntents', auth, async (req, res) => {
    const user = req.user
    const intents = getIntentsInteractor(user)
    res.send(intents)
})

module.exports = router