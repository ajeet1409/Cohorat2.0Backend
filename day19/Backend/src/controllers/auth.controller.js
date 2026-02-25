import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

// ! register constroller
const register = async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  // const isUserExitByEmail = await userModel.findOne({ email  });

  // if (isUserExitByEmail ) {
  //   return res.status(409).json({ message: "user already exit this email" });
  // }

  // const isUserExitByUsername = await userModel.findOne({ username});
  // if (isUserExitByUsername ) {
  //   return res.status(409).json({ message: "user already exit this username" });
  // }

  const isUserAllreayExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  console.log(isUserAllreayExits);

  if (isUserAllreayExits) {
    return res.status(409).json({
      message:
        "user exit by same email or username" +
        (isUserAllreayExits.email == email
          ? " user exit by this email"
          : " qqqwexit by this username"),
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await new userModel({
    username,
    email,
    bio,
    profileImage,
    password: hashPassword,
  });

  await newUser.save();

  /**
   * user data hona chahiye
   * data unique hona chahiye
   */
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: "strict",
    sameSite: true,
  });

  return res.status(201).json({
    success: true,

    user: {
      username: newUser.username,
      email: newUser.email,
      bio: newUser.bio,
      profileImage: newUser.profileImage,
    },
  });
};

//! login controller

const login = async (req, res) => {
  const {username , email, password } = req.body;

  /**
   * username
   * password
   * 
   * 
   * email
   * password
   */

//* $or:[
//   {
//     /**condition1 */
//   },
//   {
//     /**condition2 */
//   }
//* ]
// array is used for condition

  const user = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  });

  console.log(user)

  if(!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if(!isMatchPassword) {
    return res.status(401).json({ message: "email or password invalid" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message:"user login successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage:user.profileImage
    }
  });
};
export default { register ,login };
