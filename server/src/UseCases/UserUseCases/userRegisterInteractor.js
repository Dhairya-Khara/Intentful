/**
 * Creates the user and registers it to the database.
 * @interactor
 * @param {String} email - The email given by the user
 * @param {String} password - The password chosen by the user
 */

const User = require('../../Entities/UserSchema')

const createUserInteractor = async (email, password) =>{
    const user = new User({email, password})
    try{
        await user.save()
        return user
    }
    catch(e){
        console.log(e)
    }
}

module.exports = createUserInteractor