import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required "],
    unique: [true, "username is allreay exit"],
  },
  email: {
    type: String,
    unique: [true, "email is allreay exit"],
  },
  password: {
    type: String,
    // select:false,//! hidden default password => if apply select:false password save in database but mongoose does not read the password if appy query
    required: [true, "password is required"],
  },
  bio: String,

  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/x6anjwmg4/defaultImage.webp",
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "without userId not created post"],
    },
  ],

  // [1 id = 12 bytes ]
  //?example of vk 275 followers id store means it take 3.2 gb so it is not better approach instead of use edge collection

  // follower:[{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:"users"

  // }],
  // following:[{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:'users'
  // }]
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
