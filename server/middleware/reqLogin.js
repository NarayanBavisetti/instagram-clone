const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")
const dotenv = require("dotenv")


dotenv.config({path : "../.env"})
const secret = process.env.JWT_SECRET;
const verify = (req,res,next) => {
    // console.log(req)
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,secret,(err,payload) => {
        if(err){
            return res.status(401).json({error: "you must be logged in"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })
    })

}
module.exports = verify;