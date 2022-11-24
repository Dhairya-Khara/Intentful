/**
 * Checks if email and password combination exists in the database,
 * and if it does, logs the user in.
 * @interactor
 * @param {String} email - The email given by the user
 * @param {String} password - The password chosen by the user
 */

const User = require('../../Entities/UserSchema')
const jwt = require('jsonwebtoken')

const loginUserInteractor = async (email, password) =>{
    const user = await User.findOne({email, password})
    if(!user){
        throw new Error("Unable to find user.")
    }
    const token = jwt.sign({ _id: user._id.toString() }, 'by order of the techy blinders')
    return token
}

module.exports = loginUserInteractor