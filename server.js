require('dotenv').config()

const express = require("express")
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: "Kyle",
        title: "post"
    }
]


app.get('/posts',AuthAC,(req,res) => {

res.json(posts.filter(post => post.username === req.user.name))
})





function AuthAC(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    //Bearer TOKEN
}

app.listen(49642)