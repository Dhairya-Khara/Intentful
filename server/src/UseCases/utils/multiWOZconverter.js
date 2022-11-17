import myJson from './dialogues_001.json' assert {type: 'json'}

function convertMultiWOZDialoguetoRaw(multiWOZdialogue) {
    for (let i = 0; i < multiWOZdialogue.length; i++) { // multiWOZdialogue is an array of individual transcripts
        multiWOZdialogue[i] = convertSingleMultiWOZtoRaw(multiWOZdialogue[i])
    }
    return multiWOZdialogue
    // transcriptProcessor(existingMap, multiWOZdialogue)
}

function convertSingleMultiWOZtoRaw(singleMultiWOZtranscript) {
    // make SingleMultiWOZtoRaw in place
    let newFormatTranscript = [];
    for (const turn in singleMultiWOZtranscript.turns) {
        // get new intents for message object
        // we take speaker, turn_id, and utterance directly from the original transcript
        let intentsArray = [];
        for (const frame in turn.frames) { // frames is a list of frame objects, each frame is a service
            if (frame.state.active_intent != "NONE") {
                intentsArray.push(frame.state.active_intent);
            }
        }

        let newMessageObject = {
            intents: intentsArray, speaker: turn.speaker, turn_id: turn.turn_id, utterance: turn.utterance
        };
        newFormatTranscript.push(newMessageObject);
    }
    return newFormatTranscript;
    // return list[messageObject]
    // messageObject: 
    // intents list[str]
    // speaker "USER" or "SYSTEM"
    // turn_id str of int 0,1,...
    // utterance str
}

module.exports = convertMultiWOZDialoguetoRaw
