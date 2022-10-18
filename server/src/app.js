const express = require('express')
const multer = require('multer')
const cors = require('cors')

const getIntents = require('./getIntents')
const auth = require('./middleware/auth')
const User = require('./database')

const app = express()
app.use(cors())

const upload = multer()

// // route for file upload
// app.post('/upload', upload.single('file'), async (req, res)=>{
//     const item = new Database({
//         transcript: req.file.buffer
//     })
//     await item.save()
//     res.sendStatus(200)
// })

// app.get('/getTranscripts', async (req, res)=>{
//     const allResponses = await Database.find({})
//     let allTranscripts = []
//     allResponses.forEach((response)=>{
//         allTranscripts.push(...getIntents(JSON.parse(response.transcript), allTranscripts.length*100))
//     })
//     res.send(allTranscripts)
// })

// create a user
app.post('/createUser', async(req, res) =>{
    const email = req.query.email
    const password = req.query.password
    const user = new User({email, password})

    await user.save()
    res.send(user)
})

// log user in
app.post('/loginUser', async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.query.email, req.query.password)
        const token = await user.generateAuthToken()
        res.send({token})
    }
    catch (e){
        res.status(403).send()
    }
})

// get users
app.get('/users', auth, async (req, res)=>{
    const users = await User.find({})
    res.send(users)
})

app.listen(8080, ()=>{
    console.log('server is up')
})
