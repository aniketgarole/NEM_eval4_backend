const express = require("express")
const { connection } = require("./connect")
const { userRouter } = require("./routes/user.routes")
const {postsRouter} = require("./routes/posts.routes")
const { auth } = require("./middlewares/auth.middleware")
require("dotenv").config()


const app = express()
app.use(express.json())


app.use("/users", userRouter)


app.use(auth)


app.use("/posts", postsRouter)








app.listen(process.env.PORT, async() => {
    console.log(`Server has started at port ${process.env.PORT}`)
    try {
        await connection
        console.log("Server is connected to DB")
    } catch (error) {
        console.log(error.message)
    }
})