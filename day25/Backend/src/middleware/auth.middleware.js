
import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.model.js";
import redis from '../config/cache.js'

const isIdentifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: " token not provided" });

  //*this is used for model code 
  // const isBlacklistToken = await blacklistModel.findOne({token})
  // *this is for redis
  const isBlacklistToken = await redis.get(`blacklist:${token}`)
  if(isBlacklistToken) return res.status(401).json({message:"token is invalid (blacklisting)"})

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    req.user = decoded;

    next()
  } catch (error) {
    console.log(error);
    res.clearCookie(token);
    res.status(401).json({message:"invalid token"})
  }
};

export default  {isIdentifyUser}