import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required for blacklisting"],
    },

    expiresAt:{
        type:Date,
        required:[true,"date is required"]
    }
  },
  {
    timeseries: true,
  },
);

//TTL(TIME TO LIVE) INDEX
blacklistSchema.index({expiresAt:1},{expireAfterSeconds:0})

const blacklistModel = mongoose.model("tokenblactokenklist",  blacklistSchema);

export default blacklistModel;
