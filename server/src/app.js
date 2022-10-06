const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(cors())

const Database = require('./database')

app.get('/', (req, res) =>{
    res.send('aidan is the best')
})

// configuring file upload
const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        console.log(file)
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

const getAllTranscripts = async () =>{
    const allResponses = await Database.find({})
    let allTranscripts = []
    allResponses.forEach((response)=>{
        allTranscripts.push(response.transcript.toString())
    })
    console.log(allTranscripts)
    return allTranscripts
}

getAllTranscripts()

app.listen(8080, ()=>{
    console.log('server is up')
})
