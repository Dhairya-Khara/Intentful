const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const createUserInteractor = require('../UseCases/UserUseCases/userRegisterInteractor')


const jsonParser = bodyParser.json()

router.post('/createUser', jsonParser, async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await createUserInteractor(email, password)
        res.send(user)
    }
    catch (e) {
        res.sendStatus(422)
    }
})

module.exports = router