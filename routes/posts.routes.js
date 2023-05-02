const express = require("express")
const { PostModel } = require("../model/posts.model")

const postsRouter = express.Router()



postsRouter.get("/", async(req,res)=> {
    try {
        const {userId} = req.body
        const posts = await PostModel.find({userId})
        res.status(200).json({"posts": posts})
    } catch (error) {
        res.status(400).json({"err":error.message})
    }
})


postsRouter.post("/create", async(req, res) => {
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).json({"msg": "New post has been created"})
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


postsRouter.patch("/update/:postId", async(req, res)=> {
    try {
        const {postId} = req.params
        const update = req.body
        const userIdFromBody = req.body.userId
        const post = await PostModel.findOne({_id:postId})
        const userIdFromDb = post.userId
        if (userIdFromDb == userIdFromBody) {
            await PostModel.findByIdAndUpdate({postId}, update)
            res.status(200).json({"msg":"Post has been updated"})
        } else {
            res.status(200).json({"msg": "You are not authorized to make changes in this post"})
        }
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


postsRouter.delete("/delete/:postId", async(req, res)=> {
    try {
        const {postId} = req.params
        const userIdFromBody = req.body.userId
        const post = await PostModel.findOne({_id:postId})
        const userIdFromDb = post.userId
        if (userIdFromDb == userIdFromBody) {
            await PostModel.findByIdAndDelete({postId})
            res.status(200).json({"msg":"Post has been deleted"})
        } else {
            res.status(200).json({"msg": "You are not authorized to delete in this post"})
        }
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})












module.exports = {postsRouter}