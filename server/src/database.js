const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const connectionURL = "mongodb://127.0.0.1:27017/Intentful"

let Schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    transcripts: [

    ],
    intents: {

    }

})

// find user
Schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email, password: password })
    if (!user) {
        throw new Error("Unable to find user")
    }

    return user
}

// generate token
Schema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'by order of the techy blinders')

    // user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// remove token
Schema.methods.removeAuthToken = async function (token) {
    const user = this
    user.tokens = user.tokens.filter(item => item.token !== token)
    await user.save()
}

// save transcript raw
Schema.methods.saveTranscript = async function (file, name, intents) {
    const user = this
    const obj = {}
    obj[name] = file
    obj["intents"] = intents
    user.transcripts = user.transcripts.concat(obj)
    await user.save()
}

// save intents
Schema.methods.saveIntents = async function (obj) {
    const user = this
    user.intents = obj
    await user.save()
}



let User = mongoose.model('User', Schema)




//connection to database
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = User