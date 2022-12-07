const transcriptProcessInteractor = require('./transcriptProcessInteractor')
const convertMultiWOZInteractor = require('./convertMultiWOZInteractor')

/**
 * Processes the transcript that the user has uploaded using the {@link convertMultiWOZInteractor} and
 * {@link transcriptProcessInteractor} Use Cases (the latter of which identifies intents using the
 * {@link intentIdentifierInteractor} Use Case), and saves the transcript
 * and the intents to the database.
 * Open-Closed Principle: does not modify our existing code-base significantly;
 * only extends the functionality by adding step to convert a MultiWOZ transcript before applying the 
 * original processTranscript function from transcriptProcessor.
 * Liskov Substitution Principle: a transcript containing a single conversation is a subtype
 * of a transcript containing multiple conversations, so we may upload a transcript containing
 * one conversation as a substitute of a typical transcript containing an unknown number of conversations.
 * (Technically, LSP has more to do with interfaces and implementation, but it is still relevant here.)
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

    // This checks the name of the newly uploaded file doesn't exist in database
    // i.e., make sure its name is unique
    let transcriptNames = []
    const existingTranscriptInfo = user.transcripts
    try {
        existingTranscriptInfo.forEach(info => {
            transcriptNames.push(info.filename)
        })
    }
    catch (e) {
        throw new Error("Error in retrieving transcript names", e)
    }
    // confirm the filename is unique, or send an error
    if (!transcriptNames.includes(filename)) {
        userSaveTranscriptAndIntents()
    }
    else {
        throw new Error("A transcript with the same name already exists")
    }

    // use other use cases to identify intents and save the transcript and intents
    async function userSaveTranscriptAndIntents() {
        //retrieve existing transcript information (i.e., identified intents)
        const json = JSON.parse(file)
        let convertedMultiWOZtoOrigList = convertMultiWOZInteractor(json);

        // prepare allCurrentIntents variable representing user's existing intents (if they have any)
        let allCurrentIntents = new Map()
        if (user.intents !== undefined) {
            allCurrentIntents = new Map(Object.entries(user.intents))
        }

        for (let i = 0; i < convertedMultiWOZtoOrigList.length; i++) {
            let currTranscript = convertedMultiWOZtoOrigList[i] // originally a string
            currTranscript = JSON.parse(currTranscript) // now a JSON object

            // single transcript processing; get intents in the newly uploaded files
            let intentsForThisFile = transcriptProcessInteractor(new Map(), [currTranscript])

            // multiple transcript processing
            allCurrentIntents = transcriptProcessInteractor(allCurrentIntents, [currTranscript])

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
                obj["file"] = file
                obj["intents"] = intentsForThisFile
                obj["filename"] = currTranscriptFilename
                user.transcripts = user.transcripts.concat(obj)
            }
            catch (e) {
                throw new Error("Error in saving transcripts", e)
            }
        }
    }
}

module.exports = transcriptUploadInteractor