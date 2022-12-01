const multiWOZconverter = require('../utils/multiWOZconverter')
const sampleDialogue = require('./sample transcripts/size3_dialogues_001.json')
// Follows open-closed principle: does not modify our existing transcript formats.
// instead, in the intentIdentifierInteractor, we convert a MultiWOZ transcript to the 
// existing "raw" format first before applying the processTranscript function from transcriptProcessor

const convertMultiWOZInteractor = async (user, file, filename) => {
    if (user.transcripts === undefined || user.email === undefined) { throw new Error("Not a valid user") }
    let json = JSON.parse(file)
    let convertedMultiWOZtoOrigList = multiWOZconverter(json);

    for (let i = 0; i < convertedMultiWOZtoOrigList.length; i++) {
        const currTranscript = convertedMultiWOZtoOrigList[i]
        const currTranscriptFilename = filename + `_transcript_${i}`
        console.log(currTranscript)
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