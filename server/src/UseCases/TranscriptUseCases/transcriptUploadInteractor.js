const processTranscriptInteractor = require('./intentIdentifierInteractor')

const uploadTranscriptInteractor = async (user, file, filename) => {
    let transcriptNames = []
    const existingTranscriptInfo = Object.entries(user.transcripts)
    try {
        existingTranscriptInfo.forEach(info => {
            transcriptNames.push(Object.entries(info[1])[0][0])
            //info[1].forEach(subInfo => {
                //transcriptNames.push(subInfo.keys()[0])})
        })
        console.log(transcriptNames)
    }
    catch (e) {
        throw new Error("Error in retrieving transcript names", e)
    }
    
    if(!transcriptNames.includes(filename)) {
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

    else {
        throw new Error("A transcript with the same name already exists")
    }



}

module.exports = uploadTranscriptInteractor