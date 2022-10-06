const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017/transcripts"

let Schema = new mongoose.Schema({
    transcript: {
        type: Buffer
    }
})

let Item = mongoose.model('Item', Schema)

//connection to database
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = Item