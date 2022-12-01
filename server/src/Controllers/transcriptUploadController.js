const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const multer = require('multer')
const transcriptUploadInteractor = require('../UseCases/TranscriptUseCases/transcriptUploadInteractor')
const upload = multer()

/**
 * Uses {@link transcriptUploadInteractor} Use Case to
 * upload the new transcripts the user has chosen to the database.
 */
router.post('/uploadTranscript', auth, upload.single('file'), async (req, res) => {
    const user = req.user
    const file = req.file.buffer
    const filename = req.file.originalname

    try {
        await transcriptUploadInteractor(user, file, filename)
    }
    catch (e) {
        return res.status(422).send(e.message)
    }
    return res.sendStatus(200)   // if we made it here without an error, we good
})

module.exports = router