const processTranscriptInteractor = require('../TranscriptUseCases/intentIdentifierInteractor')

const uploadTranscriptInteractor = async (user, file, filename) => {
    const json = JSON.parse(file)

    let allCurrentIntents = new Map()

    if (user.intents !== undefined) {
        allCurrentIntents = new Map(Object.entries(user.intents));
    }

    //single transcript processing
    let intentsForThisFile = processTranscriptInteractor(new Map(), [json])

    //multiple transcript processing
    allCurrentIntents = processTranscriptInteractor(allCurrentIntents, [json])

    // save transcript
    try {
        const obj = {}
        obj[filename] = file
        obj["intents"] = intentsForThisFile
        user.transcripts = user.transcripts.concat(obj)
        await user.save()
    }
    catch (e) {
        throw new Error("Error in saving transcripts", e)
    }

    // save intents
    try {
        user.intents = allCurrentIntents
        await user.save()
    }
    catch (e) {
        throw new Error("Error in saving intents", e)
    }



}

module.exports = uploadTranscriptInteractor