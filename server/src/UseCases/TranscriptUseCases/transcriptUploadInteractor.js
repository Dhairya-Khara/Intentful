const processTranscriptInteractor = require('./transcriptProcessInteractor')

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
        await userSaveTranscriptAndIntents()
    }
    else {
        throw new Error("A transcript with the same name already exists")
    }

    //use other use cases to identify intents and save the transcript and intents
    async function userSaveTranscriptAndIntents() {
        try {
            //retrieve existing transcript information (i.e., identified intents)
            const json = JSON.parse(file)
            let allCurrentIntents = new Map()
            if (user.intents !== undefined) {
                allCurrentIntents = new Map(Object.entries(user.intents))
            }

            //single transcript processing; get intents in the newly uploaded files
            let intentsForThisFile = processTranscriptInteractor(new Map(), [json])

            //multiple transcript processing; merge the result with the existing intents
            allCurrentIntents = processTranscriptInteractor(allCurrentIntents, [json])

            addTranscriptToUser()
            addIntentsToUser()
            // just do one save: it will be obvious through the thrown errors if 
            // there is an error in saving transcripts or intents
            try {
                await user.save()
            }
            catch (e) {
                throw new Error("Error in saving intents", e)
            }

            //saving aggregate intents to the database
            function addIntentsToUser() {
                try {
                    user.intents = allCurrentIntents
                    // await user.save()
                }
                catch (e) {
                    throw new Error("Error in saving intents", e)
                }
            }

            //saving newly uploaded transcripts with their intents to the database
            function addTranscriptToUser() {
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
            }
        }
        catch (e) {
            throw new Error("Invalid file format")
        }
    }
}

module.exports = transcriptUploadInteractor