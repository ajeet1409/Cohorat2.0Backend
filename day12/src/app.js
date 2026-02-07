/**
 * server create karna hai 
 * server ko config karna hai
 */

import dotenv from 'dotenv'
import express from 'express' 
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'

export  const app =express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use("/api",authRouter)

