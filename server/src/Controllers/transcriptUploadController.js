const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const multer = require('multer')
const uploadTranscriptInteractor = require('../UseCases/TranscriptUseCases/transcriptUploadInteractor')

const upload = multer()
router.post('/uploadTranscript', auth, upload.single('file'), async (req, res) => {
    const user = req.user
    const file = req.file.buffer
    const filename = req.file.originalname
    try {
        await uploadTranscriptInteractor(user, file, filename)
        res.sendStatus(200)
    }
    catch(e){
        res.status(422).send(e.message)
    }
})

module.exports = router