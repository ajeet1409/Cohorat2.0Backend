
import dotenv from 'dotenv'
import express from 'express'


import mongoose from 'mongoose'

import path from 'path'
import cors from 'cors'
import FromRoutes from './routes/FromRoutes.js'

dotenv.config()
const __dirname=path.resolve()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin:"http://localhost:5173",
   
    credentials:true
}))
// app.use(cors())
app.use('/user',FromRoutes)
app.use(express.static('./public'))

const mongodb_uri = "mongodb://127.0.0.1:27017/practice"
const Port = 3000

try {

    mongoose.connect(process.env.MONGO_URI).then(
        console.log('mongodb is conntect')

    )

} catch (err) {
    console.log(`Mongodb not connected: ${err.message}`);
}

// console.log(__dirname)
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,".","/public/index.html"))
})








app.listen(Port, () => {
    console.log(`server is connected ${Port} port`)
})