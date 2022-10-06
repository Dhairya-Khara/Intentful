function getIntents(transcript_json) {
    let outsideArray = []
    let intentsArray = [];
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];
        
        if (message.intents.length > 0) {
            intentsArray.push(...message.intents);
        }
        
    }
    outsideArray.push(intentsArray)
    // Aidan: maybe at some point we incorporate functionality to see
    // who the intents came from (system or user)
    return outsideArray;
}

module.exports = getIntents