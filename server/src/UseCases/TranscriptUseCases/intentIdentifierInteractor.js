const processTranscriptList = require('../utils/transcriptProcessor');
const convertMultiWOZInteractor = require('./convertMultiWOZInteractor');

const identifyIntents = (existingProcessedMap, transcript_json_list) => {
    const convertedTranscriptList = convertMultiWOZInteractor(transcript_json_list);
    const allCurrentIntents = processTranscriptList(existingProcessedMap, convertedTranscriptList);
    return allCurrentIntents;
}

module.exports = identifyIntents