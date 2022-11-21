const processTranscriptInteractor = require('./intentIdentifierInteractor')

const uploadTranscriptInteractor = async (user, file, filename) => {
    if (user.transcripts === undefined || user.email === undefined) { throw new Error("Not a valid user") }
    let transcriptNames = []
    const existingTranscriptInfo = Object.entries(user.transcripts)
    try {
        existingTranscriptInfo.forEach(info => {
            transcriptNames.push(Object.entries(info[1])[0][0])
            //info[1].forEach(subInfo => {
            //transcriptNames.push(subInfo.keys()[0])})
        })
    }
    catch (e) {
        throw new Error("Error in retrieving transcript names", e)
    }

    if (!transcriptNames.includes(filename)) {
        const json = JSON.parse(file)

        let allCurrentIntents = new Map()

        if (user.intents !== undefined) {
            allCurrentIntents = new Map(Object.entries(user.intents));
        }

        //single transcript processing
        let intentsForThisFile = processTranscriptInteractor(new Map(), [json])

        //multiple transcript processing
        allCurrentIntents = processTranscriptInteractor(allCurrentIntents, [json])

        // add transcript to user
        try {
            const obj = {}
            obj[filename] = file
            obj["intents"] = intentsForThisFile
            user.transcripts = user.transcripts.concat(obj)
            // await user.save()        See comments at bottom re: only one save
        }
        catch (e) {
            throw new Error("Error in saving transcripts", e)
        }

        // add intents to user
        try {
            user.intents = allCurrentIntents
            // await user.save()
        }
        catch (e) {
            throw new Error("Error in saving intents", e)
        }
        // just do one save: it will be obvious through the thrown errors if 
        // there is an error in saving transcripts or intents
        await user.save()
    }

    else {
        throw new Error("A transcript with the same name already exists")
    }

}

module.exports = uploadTranscriptInteractor