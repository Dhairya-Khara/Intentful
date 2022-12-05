const intentIdentifyInteractor = require('./intentIdentifyInteractor')

/**
 * Returns a map of all processed transcripts and their identified intents
 * by reading through the newly uploaded transcripts and identifying new
 * transcripts using {@link intentIdentifyInteractor} Use Case.
 * @interactor
 * @param {Object} existingProcessedMap - Map of already processed transcripts with their intents.
 * @param {Array} transcript_json_list - List of transcripts to be uploaded
 * @return {Map} allCurrentIntents - Map of all processed transcripts (uploaded by user) and their intents.
 */
const transcriptProcessInteractor = (existingProcessedMap, transcript_json_list) => {
    const allCurrentIntents = intentIdentifyInteractor(existingProcessedMap, transcript_json_list)
    return allCurrentIntents
}

module.exports = transcriptProcessInteractor