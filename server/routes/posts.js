const express = require("express");
const verify = require("../middleware/reqLogin");
const Post = require("../models/postSchema");
const router = express.Router();


router.post("/create", verify,((req,res) => {
    const { body , photo} = req.body;
    
    if(!body || !photo){
        res.status(400).json({error:'please fill all the details'})
    }
    console.log( body , photo)
    req.user.password = undefined;
    const post = new Post({
        body,
        photo,
        postedBy: req.user
    })
    post.save().then(data => {
        res.json({post:data})
    }).catch(err => {
        res.status(500).json(err)
        console.log(err)
    })
}))

router.get("/allposts",verify,(req,res) => {
    Post.find().populate("postedBy","name")
    .then(data => {
        res.json({posts:data})
    }).catch(err => {
        console.log(err);
    })
})

router.get("/myposts", verify, ((req,res) => {
    Post.find({postedBy:req.user._id})
    .populate("postedBy","name").then(mypost => {
        res.json({mypost})
    }).catch(err => {
        console.log(err);
    })
}))

module.exports = router;