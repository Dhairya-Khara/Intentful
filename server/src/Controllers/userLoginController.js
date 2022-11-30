const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const loginUserInteractor = require('../UseCases/UserUseCases/userLoginInteractor.js')


const jsonParser = bodyParser.json()

/**
 * Uses {@link userLoginInteractor} Use Case to
 * check if the user exists. If it does, confirms 
 * email-password combination to log the user in;
 * if not, sends an error message to the client.
 */
router.post('/loginUser', jsonParser, async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const token = await loginUserInteractor(email, password)
        res.send({ token })
    }
    catch (e) {
        res.status(403).send("Cant find user")
    }
})

module.exports = router