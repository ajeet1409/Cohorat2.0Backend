import mongoose from 'mongoose'
import { URI } from '../../server.js'



 export const connectToDb=()=>{
    try {
    mongoose.connect(URI).then(()=>
        console.log('mongdb is connected')
    )
} catch (error) {

    console.log("mongodb not connected")
    
}
}