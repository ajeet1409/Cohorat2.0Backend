import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required:[true,'follower is required']
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required:[true,'followee is required']
    },

    status:{
      type:String,
      default:'pending',
      enum:{
        values:["pending","accepted","rejected"],
        message:"status can be pending and accepted and rejected"
      }
    }

   
  },
  {
    timestamps: true,
  },
);


//? for validation at schema level


followSchema.index({follower:1,followee:1},{unique:true})

// Why Unique Index?
// To prevent:

// User A follows User B multiple times

const followModel = mongoose.model('follow',followSchema)

export default followModel
