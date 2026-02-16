/**
 * server crate karna
 * server ko config karna
 */


import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

import rateLimit from 'express-rate-limit'

export const app= express()
dotenv.config()

//rate limit config
const rateLimiting=rateLimit({
    windowMs:1*60*1000, // 1 min
    max:5,
    message:"to many request try again later"
})

app.use(express.json())
app.use(cookieParser())
app.use(rateLimiting)

app.use("/api/auth",authRouter)
