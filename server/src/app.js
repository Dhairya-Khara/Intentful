const express = require('express')
const multer = require('multer')
const cors = require('cors')

const getIntents = require('./getIntents')

const app = express()
app.use(cors())

const Database = require('./database')

app.get('/', (req, res) =>{
    res.send('aidan is the best')
})

// configuring file upload
const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        cb(null, file.originalname )
    }
})

const upload = multer()

// route for file upload
app.post('/upload', upload.single('file'), async (req, res)=>{
    const item = new Database({
        transcript: req.file.buffer
    })
    await item.save()
    res.sendStatus(200)
})

app.get('/getTranscripts', async (req, res)=>{
    const allResponses = await Database.find({})
    let allTranscripts = []
    allResponses.forEach((response)=>{
        allTranscripts.push(...getIntents(JSON.parse(response.transcript), allTranscripts.length*100))
    })
    res.send(allTranscripts)
})


app.listen(8080, ()=>{
    console.log('server is up')
})
