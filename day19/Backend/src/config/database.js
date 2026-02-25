import mongoose  from "mongoose";


function connectToDb(){

    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("database connected to server ");
        })
    } catch (error) {

        console.log("database connected to server not ",error);
        
    }
}

export default connectToDb;