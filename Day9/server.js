/**
 * server start karna 
 * database connect karna
 */

import {app} from './src/app.js'
import connectDb from './src/config/database.js'


const Port = process.env.PORT

connectDb()


app.listen(Port,()=>{
    console.log(`server is running on ${Port}`)
})