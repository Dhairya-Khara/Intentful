const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const loginUserInteractor = require('../Use Cases/loginUser')


const jsonParser = bodyParser.json()

router.post('/loginUser', jsonParser, async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const token = await loginUserInteractor(email, password)
        res.send({ token })
    }
    catch(e){
        res.send("Cant find user")
    }
})

module.exports = router