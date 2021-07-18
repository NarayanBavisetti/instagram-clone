const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"instagram-user"
    }
})

const Post  = mongoose.model("instagram-post",postSchema)
module.exports = Post;