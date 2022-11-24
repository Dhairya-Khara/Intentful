/**
 * Returns the intents of the user
 * @constructor
 * @param {mongoose.Schema} user - The authorized user of the website
 */
const getIntentsInteractor = (user) =>{
    return user.intents
}

module.exports = getIntentsInteractor