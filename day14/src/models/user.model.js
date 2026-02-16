import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required "],
        unique:[true,"username is allreay exit"]
    }
    ,
    email:{
        type:String,
        unique:[true,"email is alreay exit"]
    }
    ,
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,

    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/x6anjwmg4/profile-picture-vector-illustration.webp'
    }

})

  const userModel= mongoose.model('user',userSchema)

  export default userModel;