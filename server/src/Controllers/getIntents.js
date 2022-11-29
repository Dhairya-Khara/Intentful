const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getAllIntentsInteractor = require('../UseCases/GetUseCases/getAllIntentsInteractor')

router.get('/getIntents', auth, async (req, res) => {
    const user = req.user
    const intents = getAllIntentsInteractor(user)
    res.send(intents)
})

module.exports = router