/**
 * server start karna 
 * database ko connect karna
 */

import {app} from './src/app.js'
import connectToDb from './src/config/database.js'
 const Port=process.env.PORT

 connectToDb()

app.listen(Port ,()=>{
    console.log(`server is running on port ${Port}`)
})