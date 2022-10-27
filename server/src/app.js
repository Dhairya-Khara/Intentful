const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')

const auth = require('./middleware/auth')
const User = require('./database')
const processSingleTranscript = require('./utils/processTranscript')

const app = express()
app.use(cors())

// create application/json parser
const jsonParser = bodyParser.json()



const upload = multer()


// create a user
app.post('/createUser', jsonParser, async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = new User({ email, password })

    await user.save()
    res.send(user)
})

// log the user in
app.post('/loginUser', jsonParser, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ token })
    }
    catch (e) {
        res.status(403).send()
    }
})

// log the user out
app.post('/logoutUser', auth, async (req, res) => {
    try {
        const user = req.user
        const token = req.token
        await user.removeAuthToken(token)
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(403)
    }
})

// get users
app.get('/users', auth, async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

// route for file upload. make sure file is json
app.post('/uploadTranscript', auth, upload.single('file'), async (req, res) => {
    const user = req.user
    const json = JSON.parse(req.file.buffer)
    const intents = processSingleTranscript(json)
    await user.saveRawTranscript(req.file.buffer)
    await user.saveIntents(intents)
    res.sendStatus(200)
})

// route to get transcripts for the user requesting
app.get('/getIntents', auth, async (req, res) => {
    try {
        const user = req.user
        res.send(user.intents)
        res.sendStatus(200)
    }

    catch(e){
        res.sendStatus(403)
    }

})


app.listen(8080, () => {
    console.log('server is up')
})
