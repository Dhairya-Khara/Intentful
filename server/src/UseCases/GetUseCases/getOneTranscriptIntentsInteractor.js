const getOneTranscriptIntentsInteractor = (user, name) =>{
    const transcript = user.transcripts
    for(const obj of transcript){
        if(name in obj){
            return obj.intents
        }
    }
    return "No intents"
}

module.exports = getOneTranscriptIntentsInteractor