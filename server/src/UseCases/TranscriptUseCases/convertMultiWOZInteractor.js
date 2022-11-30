const multiWOZconverter = require('../utils/multiWOZconverter')
const sampleDialogue = require('./sample transcripts/size3_dialogues_001.json')
// Follows open-closed principle: does not modify our existing transcript formats.
// instead, in the intentIdentifierInteractor, we convert a MultiWOZ transcript to the 
// existing "raw" format first before applying the processTranscript function from transcriptProcessor

const convertMultiWOZInteractor = (transcript_json_list) => {
    if (true) { // toggle multiWOZ with a button or something
        let convertedMultiWOZlist = multiWOZconverter(transcript_json_list)
        return convertedMultiWOZlist
    }
}

console.log(convertMultiWOZInteractor(sampleDialogue))
console.log(convertMultiWOZInteractor(sampleDialogue).length)

module.exports = convertMultiWOZInteractor