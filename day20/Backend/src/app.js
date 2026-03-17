/**
 * server crate karna
 * server ko config karna
 */



import express from 'express'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import cors from 'cors'

//* required routes
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.routes.js'
import userRouter from './routes/user.route.js'


export const app= express()

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use(morgan('dev'))
//rate limit config
// const rateLimiting=rateLimit({
//     windowMs:1*60*1000, // 1 min
//     max:5,
//     message:"to many request try again later"
// })
app.use(cors({
    origin:"http://localhost:5173 ",
    credentials:true
}))
app.use(express.json())  // agar frontend se tum data send kar rahe ho  as a plain text convert to json form

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
// app.use(rateLimiting)


// *using routes
app.use("/api/auth",authRouter)
app.use('/api/posts',postRouter)
app.use('/api/users',userRouter)

    