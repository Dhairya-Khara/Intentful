const mongoose = require('mongoose')

const app = require('./express')
const port = process.env.PORT || 8080


app.listen(port, () =>{
    console.log("Started on port " + port)
})


const connectionURL = "mongodb://127.0.0.1:27017/Intentful"

//connection to database
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
