/**
 * server crate karna
 * server ko config karna
 */



import express from 'express'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.routes.js'
import cookieParser from 'cookie-parser'

import rateLimit from 'express-rate-limit'

export const app= express()

app.get('/',(req,res)=>{
    res.send('hello')
})
//rate limit config
const rateLimiting=rateLimit({
    windowMs:1*60*1000, // 1 min
    max:5,
    message:"to many request try again later"
})

app.use(express.json())  // agar frontend se tum data send kar rahe ho  as a plain text convert to json form
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use(rateLimiting)


app.use("/api/auth",authRouter)
app.use('/api/posts',postRouter)
