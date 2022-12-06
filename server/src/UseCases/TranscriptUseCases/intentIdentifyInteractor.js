/**
 * Returns a map of the intents of each transcript, and an aggregate
 * intent list, by reading the intents of the  newly uploaded transctipts.
 * If an intent doesn't exist in the map yet, adds it; if it already exists,
 * updates the frequency. Moreover, keeps track of which intents come after
 * which intent in what frequency, to identify "intent associates".
 * @interactor
 * @param {Object} existingProcessedMap - Map of already processed transcripts with their intents.
 * @param {Array} transcript_json_list - List of transcripts to be uploaded
 * @return {Map} processedMap - Map of all processed transcripts of user and their intents.
 */

function intentIdentifyInteractor(existingProcessedMap, transcript_json_list) {
    let processedMap = new Map(existingProcessedMap)

    for (const transcript_json of transcript_json_list) {
        processSingleTranscript(transcript_json, processedMap);
    }
    return processedMap

}

function processSingleTranscript(transcript_json, processedMap) {
    let prevIntent = undefined; // initialize

    // iterate over each message in a single transcript
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];

        // some intents have multiple intents, so we iterate through that as well
        for (const intent of message.intents) {
            // update intent frequency in the processed map
            updateIntentInProcessedMap(intent);

            // update intent associates of the previous intent
            if (prevIntent !== undefined && prevIntent !== intent) {
                updateAssociateInProcessedMap(prevIntent, intent);
            }
            prevIntent = intent;
        }
    }

    // update intent frequency in the processed map
    function updateIntentInProcessedMap(intent) {
        // if intent doesn't exist, add it
        if (!processedMap.has(intent)) {
            processedMap.set(intent, [1, new Map()]);
        }

        // if the intent exists, update its frequency
        else {
            const currList = processedMap.get(intent);
            const newIntentFreq = currList[0] + 1;
            const sameAssociateMap = currList[1];

            processedMap.set(intent, [newIntentFreq, sameAssociateMap]);
        }
    }

    // update intent associates of the previous intent
    function updateAssociateInProcessedMap(prevIntent, intent) {
        // get current intent associates
        const currList = processedMap.get(prevIntent);
        let newAssociateMap = undefined;
        if (currList[1] instanceof Map) {
            newAssociateMap = currList[1];
        }
        else {
            newAssociateMap = new Map(Object.entries(currList[1]));
        }

        //if current intent is not an associate of the previous intent, make it so
        if (!newAssociateMap.has(intent)) {
            newAssociateMap.set(intent, 1);
        }

        //if current intent is an associate of the previous intent, update its frequency
        else {
            const newIntentAssociateFreq = newAssociateMap.get(intent) + 1;
            newAssociateMap.set(intent, newIntentAssociateFreq);
        }
        currList[1] = newAssociateMap;
    }
}

module.exports = intentIdentifyInteractor