const mongoose = require('mongoose')

const TranscriptSchema = new mongoose.Schema({
    intents: {

    },
    file: {

    },
    filename: {
        type: String
    }
})

module.exports = TranscriptSchema