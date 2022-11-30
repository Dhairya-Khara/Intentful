const User = require('../../Entities/UserSchema')

/**
 * Creates the user and registers it to the database.
 * @interactor
 * @param {String} email - The email given by the user
 * @param {String} password - The password chosen by the user
 */
const userRegisterInteractor = async (email, password) => {
    //if email is valid according to our standards, register the user
    if (validateEmail(email)) {
        const user = new User({ email, password })

        try {
            await user.save()
            return user
        }
        catch (e) {
            console.log(e)
        }
    } else {
        throw new Error("Unable to register user: email invalid.")
    }

}

function validateEmail(email) {
    //use regex to check if email is a valid email
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

module.exports = userRegisterInteractor