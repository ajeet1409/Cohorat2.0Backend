import mongoose from "mongoose";




function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("server connect to db");
    });
  } catch (error) {
    console.log(error);
  }
}

export default connectDb