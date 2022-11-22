const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getIntentsInteractor = require('../UseCases/GetUseCases/getIntentsInteractor')

router.get('/getIntents', auth, async (req, res) => {
    const user = req.user
    const intents = getIntentsInteractor(user)
    res.send(intents)
})

module.exports = router