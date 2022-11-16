const express = require('express')
const cors = require('cors')

const createUserController = require('./Controllers/userRegisterController')
const loginUserController = require('./Controllers/loginUser')
const uploadTranscriptController = require('./Controllers/transcriptUploadController')
const getIntentsController = require('./Controllers/getIntents')
const getOneTranscriptIntentsController = require('./Controllers/getOneTranscriptIntents')
const getTranscriptsController = require('./Controllers/getTranscripts')

const app = express()
app.use(cors())
app.use(createUserController)
app.use(loginUserController)
app.use(uploadTranscriptController)
app.use(getIntentsController)
app.use(getOneTranscriptIntentsController)
app.use(getTranscriptsController)

module.exports = app