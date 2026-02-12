import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





const register = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(409).json({ message: "user already register" });
  }

  // const authData={username,email,password}


  const hashPassword = await bcrypt.hash(password,10);

  const newUser = new userModel({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save()

  const token = jwt.sign({ userId: newUser._id },process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // jab token create hoga tab user  ka data bhi us token mein hoga kyuki user agr again request karta hai toh browser automatically token bhi sath mein send karega aur again  request user karta hai then express check karegaa ye kon hai but token mein user ki id hai toh express pahachan lega ye vahi user toh reponse de degaa

  res.cookie(token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(201).json({
    message: "user register successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
    },
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if(!user){
    return res.status(404).json({message:"user not found with this email"})
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "user password or email invalid" });
  }

  const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
    expiresIn: "1day",
  });

  return res.status(200).json({
    succes:true,
    token,
    user: {
      username: user.username,
      email: user.email,
    },
    message: "user login successfully",
  });
};

export default { register ,login};
