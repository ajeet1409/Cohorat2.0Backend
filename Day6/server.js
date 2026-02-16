/**
 * 
 * server ko start karna
 * database ko connect karna
 */

import { app } from "./src/app.js";


import dotenv from 'dotenv'

dotenv.config()

 export let URI=process.env.MONGODB_COMPASS
 
import { connectToDb } from "./src/Config/database.js";


let Port =3000


connectToDb()


app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})

