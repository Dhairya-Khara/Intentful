const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017/transcripts"

let Schema = new mongoose.Schema({
    emaill: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [{ // required for auth, dw about it

    }],
    transcripts: [ // to store raw transcripts files

    ],
    intents: { // model Berke made

    }

})


let Item = mongoose.model('Item', Schema)

//connection to database
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = Item