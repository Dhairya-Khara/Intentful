const processTranscript = require('./transcriptProcessInteractor')

/**
 * Returns a map of all processed transcripts and their identified intents
 * by processing newly uploaded transcripts and merging the resulting map
 * with the already existing one.
 * @interactor
 * @param {Object} existingProcessedMap - Map of already processed transcripts with their intents.
 * @param {Array} transcript_json_list - List of transcripts to be uploaded
 * @return {Map} allCurrentIntents - Map of all processed transcripts (uploaded by user) and their intents.
 */
const intentIdentifyInteractor = (existingProcessedMap, transcript_json_list) =>{
    const allCurrentIntents = processTranscript(existingProcessedMap, transcript_json_list)
    return allCurrentIntents
}

module.exports = intentIdentifyInteractor