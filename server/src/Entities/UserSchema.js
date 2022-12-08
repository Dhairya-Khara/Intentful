const mongoose = require('mongoose')
const TranscriptSchema = require('./Transcript')

// TEAM DISCUSSION re: CLEAN ARCHITECTURE

// We understand that Entities technically should be independent of frameworks like Mongoose.
// Another, maybe more cleaner, approach would be implementing our User entity
// as a Mongoose schema inside a Data Persistence layer, which would allow us
// to keep Entity as an abstract class instead. Apart from this, however,
// we believe our approach is a great practice of Clean Architecture, requiring
// developer to change only a single file to change any behavior of the app,
// and thus conforming to all Uncle Bob's rules.

// However, since our app is specified to be a MERN app, and given the scope of our project,
// it makes little practical sense to spend a significant time rewriting our whole backend to
// add in a layer specifically for database implementations. Switching database implementations
// would be unlikely in the future due to how well MERN works together.

// UserSchema represents a single user who has registered to Intentful.
// It consists of the email and the password the user has chosen while signing up,
// the transcripts (along with the file itself, the filename, and the intents identified for each)
// that the user has uploaded, and the aggregate of the intents of all transcripts.
let UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },

    transcripts: [TranscriptSchema],  //transcript is an entity of its own.

    intents: {

    }

})



let User = mongoose.model('User', UserSchema)


module.exports = User