const User = require('../../Entities/UserSchema')
const jwt = require('jsonwebtoken')

/**
 * Checks if email and password combination exists in the database,
 * and if it does, logs the user in.
 * @interactor
 * @param {String} email - The email given by the user
 * @param {String} password - The password chosen by the user
 */
const userLoginInteractor = async (email, password) =>{
    //if email-password combination exists in database, create User Entity
    const user = await User.findOne({email, password})
    if(!user){
        throw new Error("Unable to find user.")
    }

    //log the user in with appropriate token
    const userId = user._id.toString()
    const token = jwt.sign({ _id: userId }, 'by order of the techy blinders')
    return token
}

module.exports = userLoginInteractor