import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

import blacklistToken from "../models/blacklist.model.js";
import redis from "../config/cache.js";

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
    expiresIn: "10m",
  });
  res.cookie("token", token, {
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
  const user = await userModel
    .findOne({
      $or: [
        { username }, // condition 1
        {
          email,
        }, // condition2
      ],
    })
    .select("+password");

  // * why write invalid credentials when user not found because for security reason

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credential",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(401).json({ message: "Invalid credetials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.cookie("token", token, {
    httpONly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json({ success: true, message: "user login successfully", user });
};

const getMe = async (req, res) => {
  console.log(req.user);

  const user = await userModel.findById(req.user.userId).select("-password");
  console.log(user);

  if (!user) return res.status(401).json({ message: "invalid credentials" });

  return res
    .status(200)
    .json({ message: "get-me data successfully", success: true, user });
};

const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");

  // decode token  to get expire time
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  console.log(decoded);

  // await blacklistToken.create({
  //   token,
  //   expiresAt: new Date(decoded.exp * 1000), // convert to ms
  // });
  const expireTime = decoded.exp;
  console.log(expireTime)
  const currentTime = Math.floor(Date.now() / 1000); // Converts current time into seconds
  console.log(currentTime)
  const ttl = expireTime - currentTime;
  console.log(ttl)

  if (ttl > 0) {
    await redis.set(`blacklist:${token}`, "true", "EX", ttl);
  }

  return res.status(201).json({
    message: "logout successfully",
  });
};

export default { register, login, getMe, logoutUser };
