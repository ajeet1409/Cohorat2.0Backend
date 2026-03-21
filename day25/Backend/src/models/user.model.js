import mongoose from "mongoose";

const userchema  = mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true
    },

    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    }
    ,password:{
        type:String,
        required:[true,"password is required"]
    }
})

//Task
// userSchema.pre('save',function (next){})
// userSchema.pre('save',function (next){})


const userModel = mongoose.model('user',userchema)
export default userModel;