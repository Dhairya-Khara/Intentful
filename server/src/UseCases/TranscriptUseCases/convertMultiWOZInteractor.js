const multiWOZconverter = require('../utils/multiWOZconverter')
// Follows open-closed principle: does not modify our existing transcript formats.
// instead, in the intentIdentifierInteractor, we convert a MultiWOZ transcript to the 
// existing "raw" format first before applying the processTranscript function from transcriptProcessor

const convertMultiWOZ = (transcript_json_list) => {
    if (checkMultiWOZ === true) { // toggle multiWOZ with a button or something
        let convertedMultiWOZlist = multiWOZconverter(transcript_json_list)
        return convertedMultiWOZlist
    }
    return transcript_json_list
}

module.exports = convertMultiWOZ