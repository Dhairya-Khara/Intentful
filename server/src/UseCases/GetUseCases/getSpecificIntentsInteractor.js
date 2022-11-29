/**
 * Returns the intents of the single transcript requested by the user.
 * @interactor
 * @param {mongoose.Schema} user - The current authorized user of the website.
 * @param {String} name - Name of the transcript file requested by the user.
 * @returns {Object} user.intents - The intents identified in user's transcipts.
 */
const getSpecificIntentsInteractor = (user, name) =>{
    const allTranscripts = user.transcripts
    for(const transcript of allTranscripts){
        if(name in transcript){
            return transcript.intents
        }
    }
    return "No intents"
}

module.exports = getSpecificIntentsInteractor