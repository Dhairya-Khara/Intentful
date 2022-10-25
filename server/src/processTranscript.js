import myJson from './transcript1.json' assert {type: 'json'};
// process individual transcript and return single processed transcript
function processSingleTranscript(transcript_json) {
    let processedTranscript = new Map()
    let intentCountMap = new Map()
    let intentRelatedMap = new Map()
    let prevIntent = undefined
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];

        if (message.intents.length > 0) {
            getMessageIntentCounts(message); // add intents to intentCountMap
            getRelatedIntents(message); // update intentRelatedMap with the related intents
        }
    }
    for (const intent of intentCountMap.keys()) {
        processedTranscript.set(intent, [intentCountMap.get(intent), intentRelatedMap.get(intent)])
    }
    console.log(intentCountMap)
    console.log(intentRelatedMap)
    console.log(processedTranscript)
    // Aidan: maybe at some point we incorporate functionality to see
    // who the intents came from (system or user)
    return processedTranscript;


    function getRelatedIntents(message) {
        let numIntents = message.intents.length;
        while (numIntents > 0) {
            let currIntent = message.intents[numIntents - 1];
            if (prevIntent === undefined) { // this means this is the first intent in transcript
                intentRelatedMap.set(currIntent, new Map());
                prevIntent = currIntent;
                continue;
            } else if (!(intentRelatedMap.has(currIntent))) {
                intentRelatedMap.set(currIntent, new Map());
            }
            numIntents -= 1;

            // if currIntent is same as prev then nothing to update
            if (currIntent === prevIntent) { continue }
            intentRelatedMap.get(currIntent).set(prevIntent, 1)
            intentRelatedMap.get(prevIntent).set(currIntent, 1)
            // ((intentRelatedMap.get(currIntent).get(prevIntent)) || 1) doesn't work as intended

            prevIntent = currIntent;
        }
    }

    function getMessageIntentCounts(message) {
        let numIntents = message.intents.length;
        while (numIntents > 0) {
            let currIntent = message.intents[numIntents - 1];
            // add key-value pair or increment value by 1 if it already exists
            intentCountMap.set(currIntent, ((intentCountMap.get(currIntent) + 1) || 1));
            numIntents -= 1;
        }
    }
}
processSingleTranscript(myJson)
module.exports = processSingleTranscript

// add processed transcript to the aggregate processed transcript

