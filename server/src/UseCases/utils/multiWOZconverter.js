// DESCRIPTION
// Converts all the transcripts in a large dialogue file to separate JSON transcripts following the original format.
// Returns an array containing individual JSON-type transcripts in our original format.

function convertMultiWOZDialoguetoRaw(multiWOZdialogue) {
    // JSON.parse(multiWOZdialogue) // originally type Buffer
    for (let i = 0; i < multiWOZdialogue.length; i++) { // multiWOZdialogue is an array of individual transcripts
        multiWOZdialogue[i] = convertSingleMultiWOZtoRaw(multiWOZdialogue[i])
    }
    return multiWOZdialogue
}

function convertSingleMultiWOZtoRaw(singleMultiWOZtranscript) {
    // make SingleMultiWOZtoRaw in place
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

module.exports = convertMultiWOZDialoguetoRaw
