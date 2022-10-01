const express = require('express')
const app = express()

app.get('/', (req, res) =>{
    res.send('aidan is the best')
})


app.listen(8080, ()=>{
    console.log('server is up')
})
