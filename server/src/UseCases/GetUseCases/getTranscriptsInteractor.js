const getTranscriptsInteractor = (user) => {
    if (user.transcripts !== undefined) { return user.transcripts }
    return 'user not a valid User model or user does not have transcripts property';
}

module.exports = getTranscriptsInteractor