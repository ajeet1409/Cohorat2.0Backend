import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const userAlreadyExit = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExit) {
    return res.status(409).json({
      message:
        "user alreay exit by this " +
        (userAlreadyExit.email == email ? "email" : "username"),
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    email,
    password: hashPassword,
  });
  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie(token, token, {
    httpOnly: true, // js can not access cookie // is someone XSS
    secure: true, // req sent over  https
    sameSite: "strict", // csrf protection
  });

  return res
    .status(201)
    .json({ success: true, message: " user register  successfully", newUser });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [
      { username }, // condition 1
      {
        email,
      }, // condition2
    ],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credential",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(401).json({ message: "Invalid credetials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie(token, token, {
    httpONly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json({ success: true, message: "user login successfully", user });
};

export default { register, login };
