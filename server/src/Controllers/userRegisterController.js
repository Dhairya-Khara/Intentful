const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const createUserInteractor = require('../UseCases/UserUseCases/userRegisterInteractor')


const jsonParser = bodyParser.json()

/**
 * Uses {@link userRegisterInteractor} Use Case to
 * check if email and passwords are  up to the
 * website's standards. If yes, registers the user
 * to the database; if not, sends an error message
 * to the client.
 */
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