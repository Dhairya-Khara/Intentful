const multiWOZconverter = require('../utils/multiWOZconverter')
const sampleDialogue = require('./sample transcripts/size3_dialogues_001.json')
// Follows open-closed principle: does not modify our existing transcript formats.
// instead, in the intentIdentifierInteractor, we convert a MultiWOZ transcript to the 
// existing "raw" format first before applying the processTranscript function from transcriptProcessor

const convertMultiWOZInteractor = async (user, file, filename) => {
    if (user.transcripts === undefined || user.email === undefined) { throw new Error("Not a valid user") }
    console.log(file)
    console.log(typeof file)
    console.log(file.length)
    let convertedMultiWOZtoOrigList = multiWOZconverter(file);
    console.log(convertedMultiWOZtoOrigList)
    console.log(typeof convertedMultiWOZtoOrigList)
    console.log(convertedMultiWOZtoOrigList.length)
    for (let i = 0; i < convertedTranscriptList.length; i++) {
        const currTranscript = convertedTranscriptList[i]
        const currTranscriptFilename = filename + `_transcript_${i}`
        try {
            await uploadTranscriptInteractor(user, currTranscript, currTranscriptFilename)
        }
        catch (e) {
            throw new Error("Error in saving a transcript", e)
        }
    }
}
// const convertMultiWOZInteractor = (transcript_json_list) => {
//     if (true) { // toggle multiWOZ with a button or something
//         let convertedMultiWOZlist = multiWOZconverter(transcript_json_list)
//         return convertedMultiWOZlist
//     }
// }

// console.log(convertMultiWOZInteractor(sampleDialogue))
// console.log(convertMultiWOZInteractor(sampleDialogue).length)

module.exports = convertMultiWOZInteractor