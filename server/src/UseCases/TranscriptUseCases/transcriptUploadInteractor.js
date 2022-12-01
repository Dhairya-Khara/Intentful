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

        for (let i = 0; i < convertedMultiWOZtoOrigList.length; i++) {
            let currTranscript = convertedMultiWOZtoOrigList[i] // originally a string
            currTranscript = JSON.parse(currTranscript) // now a JSON object

            //single transcript processing
            let intentsForThisFile = processTranscriptInteractor(new Map(), [currTranscript])

            //multiple transcript processing
            allCurrentIntents = processTranscriptInteractor(allCurrentIntents, [currTranscript])
            // console.log(allCurrentIntents)

            addTranscriptToUser(i, intentsForThisFile)
            user.intents = allCurrentIntents  // overwrite user's intents with the current intents
        }

        try {
            await user.save()
        }
        catch (e) {
            throw new Error("Error in saving intents", e)
        }

        function addTranscriptToUser(i, intentsForThisFile) {
            try {
                const obj = {}
                let currTranscriptFilename = filename
                if (i !== 0) {
                    currTranscriptFilename = currTranscriptFilename + `_${i}`
                }
                obj[currTranscriptFilename] = file
                obj["intents"] = intentsForThisFile
                user.transcripts = user.transcripts.concat(obj)
            }
            catch (e) {
                throw new Error("Error in saving transcripts", e)
            }
        }
    }
}

module.exports = uploadTranscriptInteractor