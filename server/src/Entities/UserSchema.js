const mongoose = require('mongoose')
const TranscriptSchema = require('./Transcript')

// TEAM DISCUSSION re: CLEAN ARCHITECTURE
// We understand that Entities technically should be independent of frameworks like Mongoose.
// If we have more time, we might want to implement our User entity as a Mongoose schema inside 
// a Data Persistence layer, and maybe have our Entity be an abstract class instead.

// However, since our app is specified to be a MERN app, and given the scope of our project,
// it makes little practical sense to spend a significant time rewriting our whole backend to
// add in a layer specifically for database implementations. Switching database implementations
// would be unlikely in the future due to how well MERN works together.

let Schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    transcripts: [TranscriptSchema],

    intents: {

    }

})



let User = mongoose.model('User', Schema)


module.exports = User