import mongoose from "mongoose";



function connectToDb(){
    try {

    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("sever connected to database")
    })
    
} catch (error) {
    
    console.log("server is not connect to db",error)
}
}

export default connectToDb