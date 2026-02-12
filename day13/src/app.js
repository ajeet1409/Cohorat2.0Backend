/**
 * server create karna hai 
 * server ko config karna hai
 */

import dotenv from 'dotenv'
import express from 'express' 
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'

// import rateLimit from 'express-rate-limit'


export  const app =express()

dotenv.config()



app.use(express.json())
app.use(cookieParser())

// const rateLimiter = rateLimit({
//     windowMs:10*60*1000,
//     max:50,
//     message: "Too many requests, try again later."

// })

// app.use(rateLimiter)

app.use("/api",authRouter)

