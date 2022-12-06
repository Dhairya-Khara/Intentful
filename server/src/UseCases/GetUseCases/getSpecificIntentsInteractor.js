/**
 * Returns the intents of the single transcript requested by the user.
 * @interactor
 * @param {mongoose.Schema} user - The current authorized user of the website.
 * @param {String} name - Name of the transcript file requested by the user.
 * @returns {Object} user.intents - The intents identified in user's transcipts.
 */
const getSpecificIntentsInteractor = (user, name) =>{
    const transcripts = user.transcripts
    console.log(name)
    for(const obj of transcripts){
        if(obj.filename === name){
            return obj.intents
        }
    }
    return "No intents"
}

module.exports = getSpecificIntentsInteractor