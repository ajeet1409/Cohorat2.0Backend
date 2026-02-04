import express from 'express'

import userModel from './models/User.js'
import mongoose from 'mongoose'
import cors from 'cors'
import FromRoutes from './routes/FromRoutes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin:"http://localhost:5173",
   
    credentials:true
}))
// app.use(cors())
app.use('/user',FromRoutes)

const mongodb_uri = "mongodb://127.0.0.1:27017/practice"
const Port = 5000

try {

    mongoose.connect(mongodb_uri).then(
        console.log('mongodb is conntect')

    )

} catch (err) {
    console.log(`Mongodb not connected: ${err.message}`);
}


app.get('/', (req, res) => {
    res.send("hello world123 ")
})






app.listen(Port, () => {
    console.log(`server is connected ${Port} port`)
})