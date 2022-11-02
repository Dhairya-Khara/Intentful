function processTranscript(existingProcessedMap, transcript_json_list) {
    let processedMap = existingProcessedMap

    // iterating all transcripts
    for (const transcript_json of transcript_json_list) {

        let prevIntent = undefined
        // iterating each message in a single transcript
        for (let i = 0; i < transcript_json.length; i++) {
            let message = transcript_json[i];
            // some intents have multiple intents, so we iterate through that as well
            for (const intent of message.intents) {
                if (!processedMap.has(intent)) {
                    processedMap.set(intent, [1, new Map()])
                }
                else {
                    const currList = processedMap.get(intent)
                    const newIntentFreq = currList[0] + 1
                    const sameAssociateMap = currList[1]

                    processedMap.set(intent, [newIntentFreq, sameAssociateMap])
                }
                if (prevIntent !== undefined) {
                    const currList = processedMap.get(prevIntent)
                    let newAssociateMap = currList[1]
                    if (!newAssociateMap.has(intent)) {
                        newAssociateMap.set(intent, 1)
                    }
                    else {
                        const newIntentAssociateFreq = newAssociateMap.get(intent) + 1
                        newAssociateMap.set(intent, newIntentAssociateFreq)
                    }
                }
                prevIntent = intent
            }
        }
    }
    return processedMap
}

module.exports = processTranscript

