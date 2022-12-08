/**
 * Returns all the transcripts uploaded by the user.
 * @interactor
 * @param {mongoose.Schema} user - The current authorized user of the website.
 * @returns {mongoose.Schema} user.transcripts - The transcripts uploaded by the user, which is an entity itself.
 */
const getTranscriptsInteractor = (user) => {
    if (user.transcripts !== undefined) {
        return user.transcripts
    }
    return 'user not a valid User model or user does not have transcripts property';
}

module.exports = getTranscriptsInteractor