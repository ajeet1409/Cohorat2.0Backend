
/**
 * server ko start karna
 * databse ko connect karna
 */

import dotenv from 'dotenv'
dotenv.config()

import {app} from './src/app.js'
import connectToDb from './src/config/database.js'


 const Port = process.env.PORT
 connectToDb()

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})