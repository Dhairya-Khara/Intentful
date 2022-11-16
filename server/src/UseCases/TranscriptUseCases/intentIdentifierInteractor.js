const processTranscript = require('../utils/transcriptProcessor')

const identifyIntents = (existingProcessedMap, transcript_json_list) =>{
    const allCurrentIntents = processTranscript(existingProcessedMap, transcript_json_list)
    return allCurrentIntents
}

module.exports = identifyIntents