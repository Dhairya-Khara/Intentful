const processTranscriptInteractor = require('./transcriptProcessInteractor')
const multiWOZconverter = require('./multiWOZconverter')


/**
 * Processes the transcript that the user has uploaded using 
 * {@link transcriptProcessInteractor} Use Case, which identifies intents using
 * {@link intentIdentifierInteractor} Use Case, and finally saves the transcript
 * and the intents to the database.
 * @interactor
 * @param {mongoose.Schema} user - The current authorized user of the website
 * @param {JSON} file - The JSON transcript file that the user has uploaded
 * @param {String} filename - Name of the file the user has uploaded
 */
const transcriptUploadInteractor = async (user, file, filename) => {
    //throw an error if not a valid user
    if (user.transcripts === undefined || user.email === undefined) {
        throw new Error("Not a valid user")
    }

    //make sure the name of the newly uploaded file doesn't exist in database
    //i.e., make sure its name is unique
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

    //confirm the filename is unique, or send an error
    if (!transcriptNames.includes(filename)) {
        userSaveTranscriptAndIntents()
    }
    else {
        throw new Error("A transcript with the same name already exists")
    }

    //use other use cases to identify intents and save the transcript and intents
    async function userSaveTranscriptAndIntents() {
        //retrieve existing transcript information (i.e., identified intents)
        const json = JSON.parse(file)
        let convertedMultiWOZtoOrigList = multiWOZconverter(json);
        let allCurrentIntents = new Map()
        if (user.intents !== undefined) {
            allCurrentIntents = new Map(Object.entries(user.intents))
        }

        for (let i = 0; i < convertedMultiWOZtoOrigList.length; i++) {
            let currTranscript = convertedMultiWOZtoOrigList[i] // originally a string
            currTranscript = JSON.parse(currTranscript) // now a JSON object

            //single transcript processing; get intents in the newly uploaded files
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

module.exports = transcriptUploadInteractor