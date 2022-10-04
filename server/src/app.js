const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req, res) =>{
    res.send('aidan is the best')
})

// configuring file upload
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname)
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, file.originalname )
    }
})

const upload = multer({storage: storage})

// route for file upload
app.post('/upload', upload.single('file'), (req, res)=>{
    res.send()
})



app.listen(8080, ()=>{
    console.log('server is up')
})
