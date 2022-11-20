const User = require('../../Entities/UserSchema')

const createUserInteractor = async (email, password) => {
    const user = new User({ email, password })

    try {
        await user.save()
        return user
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = createUserInteractor