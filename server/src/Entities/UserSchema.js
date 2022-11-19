const mongoose = require('mongoose')


let Schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    transcripts: [

    ],
    intents: {

    }

})



let User = mongoose.model('User', Schema)


module.exports = User