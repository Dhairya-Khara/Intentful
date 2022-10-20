const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')

const getIntents = require('./getIntents')
const auth = require('./middleware/auth')
const User = require('./database')

const app = express()
app.use(cors())

// create application/json parser
const jsonParser = bodyParser.json()
 


const upload = multer()



// app.get('/getTranscripts', async (req, res)=>{
//     const allResponses = await Database.find({})
//     let allTranscripts = []
//     allResponses.forEach((response)=>{
//         allTranscripts.push(...getIntents(JSON.parse(response.transcript), allTranscripts.length*100))
//     })
//     res.send(allTranscripts)
// })

// create a user
app.post('/createUser', jsonParser, async(req, res) =>{
    const email = req.body.email
    const password = req.body.password
    const user = new User({email, password})

    await user.save()
    res.send(user)
})

// log the user in
app.post('/loginUser', jsonParser, async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({token})
    }
    catch (e){
        res.status(403).send()
    }
})

// log the user out
app.post('/logoutUser', auth, async (req,res) =>{
    try{
        const user = req.user
        const token = req.token
        await user.removeAuthToken(token)
        res.sendStatus(200)
    }
    catch(e){
        res.sendStatus(403)
    }
})

// get users
app.get('/users', auth, async (req, res)=>{
    const users = await User.find({})
    res.send(users)
})

// route for file upload
app.post('/uploadTranscript', auth, upload.single('file'), async (req, res)=>{
    const user = req.user
    user.saveRawTranscript(req.file.buffer)
    res.sendStatus(200)
})


app.listen(8080, ()=>{
    console.log('server is up')
})
