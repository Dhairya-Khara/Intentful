const processTranscriptInteractor = require('./intentIdentifierInteractor')
const multiWOZconverter = require('../utils/multiWOZconverter')

const uploadTranscriptInteractor = async (user, file, filename) => {
    if (user.transcripts === undefined || user.email === undefined) { throw new Error("Not a valid user") }
    let transcriptNames = []
    const existingTranscriptInfo = Object.entries(user.transcripts)
    try {
        existingTranscriptInfo.forEach(info => {
            transcriptNames.push(Object.entries(info[1])[0][0])
        })
    }
    catch (e) {
        throw new Error("Error in retrieving transcript names", e)
    }

    if (!transcriptNames.includes(filename)) {
        userSaveTranscriptAndIntents()
    }

    else {
        throw new Error("A transcript with the same name already exists")
    }


    async function userSaveTranscriptAndIntents() {
        const json = JSON.parse(file)
        let convertedMultiWOZtoOrigList = multiWOZconverter(json);
        let allCurrentIntents = new Map()
        if (user.intents !== undefined) {
            allCurrentIntents = new Map(Object.entries(user.intents))
        }
        console.log(user.intents)
        console.log(allCurrentIntents)
        for (let i = 0; i < convertedMultiWOZtoOrigList.length; i++) {
            let currTranscript = convertedMultiWOZtoOrigList[i] // originally a string
            currTranscript = JSON.parse(currTranscript) // now a JSON object

            //single transcript processing
            let intentsForThisFile = processTranscriptInteractor(new Map(), [currTranscript])

            //multiple transcript processing
            allCurrentIntents = processTranscriptInteractor(allCurrentIntents, [currTranscript])
            // console.log(allCurrentIntents)

            addTranscriptToUser(i, intentsForThisFile)
            user.intents = allCurrentIntents
            // just do one save: it will be obvious through the thrown errors if 
            // there is an error in saving transcripts or intents

        }
        console.log(user.intents)

        try {
            await user.save()
        }
        catch (e) {
            throw new Error("Error in saving intents", e)
        }
        // function addIntentsToUser(allCurrentIntents) {
        //     try {
        //         user.intents = allCurrentIntents
        //         // await user.save()
        //     }
        //     catch (e) {
        //         throw new Error("Error in saving intents", e)
        //     }
        // }

        function addTranscriptToUser(i, intentsForThisFile) {
            try {
                const obj = {}
                const currTranscriptFilename = filename + `_${i}`
                obj[currTranscriptFilename] = file
                obj["intents"] = intentsForThisFile
                user.transcripts = user.transcripts.concat(obj)
                // await user.save()        See comments at bottom re: only one save
            }
            catch (e) {
                throw new Error("Error in saving transcripts", e)
            }
        }
    }
}

module.exports = uploadTranscriptInteractor