import mongoose from "mongoose";

const likeScehma= new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:[true ,"post id is required to create a like"]
    }
    ,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,"user id also required to creating post"]
    }


},
{
    timestamps:true
}
)

//? schema level protection
likeScehma.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model('like',likeScehma)
export default likeModel