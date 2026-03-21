import mongoose from "mongoose";


function connectToDb(){

    try {
        mongoose.connect('mongodb://localhost:27017/modify').then(()=>{
            console.log('database connect to server')
        })
    } catch (error) {
        console.log('database does not connect to server')
        
    }
}

export default connectToDb