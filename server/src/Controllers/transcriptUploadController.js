const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const multer = require('multer')
const uploadTranscriptInteractor = require('../UseCases/TranscriptUseCases/uploadTranscript')

const upload = multer()
router.post('/uploadTranscript', auth, upload.single('file'), async (req, res) => {
    const user = req.user
    const file = req.file.buffer
    const filename = req.file.originalname
    try {
        uploadTranscriptInteractor(user, file, filename)
    }
    catch(e){
        res.sendStatus(500)
        console.log(e)
    }
    res.sendStatus(200)
})

module.exports = router