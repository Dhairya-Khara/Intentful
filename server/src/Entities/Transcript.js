const mongoose = require('mongoose')

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

// TranscriptSchema represents a single transcript uploaded by the user
// and processed by the program. It consists of 
// intents identified in the backend, the file the user uploaded, and filename.
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