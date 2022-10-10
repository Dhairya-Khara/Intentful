function getIntents(transcript_json, counter) {
    let outsideArray = []
    let intentsArray = [];
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];
        
        if (message.intents.length > 0) {
            counter += 1;
            intentsArray.push({"id": counter, "content": message.intents});
        }
        
    }
    outsideArray.push(intentsArray)
    // Aidan: maybe at some point we incorporate functionality to see
    // who the intents came from (system or user)
    return outsideArray;
}

module.exports = getIntents