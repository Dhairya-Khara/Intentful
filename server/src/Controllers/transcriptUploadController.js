const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const multer = require('multer')
const uploadTranscriptInteractor = require('../UseCases/TranscriptUseCases/transcriptUploadInteractor');
const convertMultiWOZInteractor = require('../UseCases/TranscriptUseCases/convertMultiWOZInteractor')

const upload = multer()
router.post('/uploadTranscript', auth, upload.single('file'), async (req, res) => {
    const user = req.user
    const file = req.file.buffer

    const convertedTranscriptList = convertMultiWOZInteractor(file); // 
    console.log(convertedTranscriptList)
    console.log(typeof convertedTranscriptList)
    console.log(convertedTranscriptList.length)
    // for (let i = 0; i < convertedTranscriptList.length; i++) {
    //     const curr_transcript = convertedTranscriptList[i]
    //     //console.log(i)
    //     const filename = req.file.originalname + `_transcript_${i}`
    //     try {
    //         await uploadTranscriptInteractor(user, curr_transcript, filename)
    //         // res.sendStatus(200)
    //     }
    //     catch (e) {
    //         res.status(422).send(e.message)
    //     }
    // }
    res.sendStatus(200)   // if we made it here without an error, we good
})

module.exports = router