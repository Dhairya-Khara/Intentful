
function processSingleTranscript(transcript_json) {
    let { intentCountMap, intentRelatedMap } = getCountAndRelatedMaps(transcript_json)
    let processedTranscript = getSingleProcessedTranscript(intentCountMap, intentRelatedMap);
    return processedTranscript;
}

function getCountAndRelatedMaps(transcript_json) {
    let intentCountMap = new Map()
    let intentRelatedMap = new Map()
    let prevIntent = undefined
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];

        if (message.intents.length > 0) {
            addMessageIntentCounts(intentCountMap, message); // add intents to intentCountMap

            // update intentRelatedMap with the related intents and return an intent to update prevIntent
            prevIntent = addRelatedIntents(intentRelatedMap, message, prevIntent);
        }
    }
    return { intentCountMap, intentRelatedMap }
}

function getSingleProcessedTranscript(intentCountMap, intentRelatedMap) {
    let processedTranscript = new Map();

    for (const intent of intentCountMap.keys()) {
        processedTranscript.set(intent, [intentCountMap.get(intent), intentRelatedMap.get(intent)]);
    }
    return processedTranscript;
}

function addMessageIntentCounts(intentCountMap, message) {
    let numIntents = message.intents.length;
    while (numIntents > 0) {
        let currIntent = message.intents[numIntents - 1];
        // add key-value pair or increment value by 1 if it already exists
        intentCountMap.set(currIntent, ((intentCountMap.get(currIntent) + 1) || 1));
        numIntents -= 1;
    }
}

function addRelatedIntents(intentRelatedMap, message, prevIntent = undefined) {
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
    return prevIntent
}

// processSingleTranscript(myJson)
module.exports = processSingleTranscript

// add processed transcript to the aggregate processed transcript

