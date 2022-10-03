const express = require('express')
const multer = require('multer')
const app = express()

app.get('/', (req, res) =>{
    res.send('aidan is the best')
})

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname)
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname )
    }
})

const upload = multer({storage: storage})


app.post('/upload', upload.single('file'), (req, res)=>{
    res.send()
})



app.listen(8080, ()=>{
    console.log('server is up')
})
