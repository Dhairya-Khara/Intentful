const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const getTranscriptsInteractor = require('../Use Cases/getTranscripts')

router.get('/getTranscripts', auth, async (req, res) => {
    const user = req.user
    const transcripts = getTranscriptsInteractor(user)
    res.send(transcripts)
})

module.exports = router