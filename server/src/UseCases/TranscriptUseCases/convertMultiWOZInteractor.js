/**
 * Returns an array of JSON-string "original/simplified format" transcripts from the MultiWOZ dialogue
 * uploaded by iterating through the MultiWOZ dialogue array and converting the individual
 * transcripts in the array to the simplified format one-by-one.
 * @interactor
 * @param {Array} multiWOZdialogue - List of individual MultiWOZ transcripts to be converted to simplified format
 * @return {Array} multiWOZdialogue - List of simplified transcripts in the "original" format for further processing
 */

function convertMultiWOZInteractor(multiWOZdialogue) {
    for (let i = 0; i < multiWOZdialogue.length; i++) { // multiWOZdialogue is an array of individual transcripts
        multiWOZdialogue[i] = convertSingleMultiWOZtoRaw(multiWOZdialogue[i])
    }
    return multiWOZdialogue
}

function convertSingleMultiWOZtoRaw(singleMultiWOZtranscript) {
    let newFormatTranscript = [];

    // iterate through turns. Transcript.turns is an object, and turn is a key
    for (const turn in singleMultiWOZtranscript.turns) {
        // get intents from the nested data for our new message object
        let turnObj = singleMultiWOZtranscript.turns[turn]
        let intentsArray = getTurnIntents(turnObj);

        // we take speaker, turn_id, and utterance directly from the original transcript turn
        let newMessageObject = {
            intents: intentsArray, speaker: turnObj.speaker, turn_id: turnObj.turn_id, utterance: turnObj.utterance
        };
        newFormatTranscript.push(newMessageObject);
    }
    // turn Object into JSON string again so that it is type-compliant with the other transcriptProcessor function
    newFormatTranscript = JSON.stringify(newFormatTranscript)
    return newFormatTranscript;


    function getTurnIntents(turnObj) {
        let intentsArray = [];
        for (const frame in turnObj.frames) { // frames is a list of frame objects, each frame is a service
            let frameObj = turnObj.frames[frame];
            if (typeof (frameObj.state) !== "undefined" &&
                frameObj.state.active_intent != "NONE") {
                intentsArray.push(frameObj.state.active_intent);
            }
        }
        return intentsArray;
    }
}

module.exports = convertMultiWOZInteractor