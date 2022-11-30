const processTranscriptList = require('../utils/transcriptProcessor');

const identifyIntents = (existingProcessedMap, transcript_json_list) => {
    const allCurrentIntents = processTranscriptList(existingProcessedMap, transcript_json_list);
    return allCurrentIntents;
}

module.exports = identifyIntents