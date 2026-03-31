import mongoose from "mongoose";


function connectToDb(){

    try {
        mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log('Mongodb connect to server')
        })
    } catch (error) {
        console.log('database does not connect to server')
        
    }
}

export default connectToDb