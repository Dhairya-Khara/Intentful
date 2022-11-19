const jwt = require('jsonwebtoken')
const User = require('../Entities/UserSchema')

const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'by order of the techy blinders')
        const user = await User.findOne({_id: decoded._id})

        if(!user){
            throw new Error()
        }

        req.user = user
        req.token = token
        next()
    }   
    catch(e){
        res.status(401).send({error: "Not Authenticated"})
    }
}

module.exports = auth