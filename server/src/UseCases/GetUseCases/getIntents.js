/**
 * Returns the intents of the user
 * @interactor
 * @param {mongoose.Schema} user - The authorized user of the website
 */
const getIntentsInteractor = (user) =>{
    return user.intents
}

module.exports = getIntentsInteractor