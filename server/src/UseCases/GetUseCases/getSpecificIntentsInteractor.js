/**
 * Returns the intents of the single transcript requested by the user.
 * @interactor
 * @param {mongoose.Schema} user - The current authorized user of the website.
 * @param {String} name - Name of the transcript file requested by the user.
 * @returns {Object} singleTranscript.intents - The intents identified in the transcript requested (if it exists).
 */

const getSpecificIntentsInteractor = (user, name) => {
    const allUserTranscripts = user.transcripts
    for (const singleTranscript of allUserTranscripts) {
        if (singleTranscript.filename === name) {
            return singleTranscript.intents
        }
    }
    return "No intents"
}

module.exports = getSpecificIntentsInteractor