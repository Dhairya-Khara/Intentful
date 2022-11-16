const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const createUserInteractor = require('../UseCases/UserUseCases/createUser')


const jsonParser = bodyParser.json()

router.post('/createUser', jsonParser, async(req, res)=>{
    const email = req.body.email
    const password = req.body.password
    const user = await createUserInteractor(email, password)
    res.send(user)
})

module.exports = router