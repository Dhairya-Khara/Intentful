const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017/Intentful"

let Schema = new mongoose.Schema({
    email: {
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


let User = mongoose.model('User', Schema)

//connection to database
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = User