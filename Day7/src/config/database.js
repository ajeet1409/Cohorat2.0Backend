import mongoose from "mongoose";

function connectToDb(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("server is connect to database")
    })
}

export default connectToDb