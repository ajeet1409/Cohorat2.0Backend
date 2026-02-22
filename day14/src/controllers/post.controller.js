import "../config/env.js";
// import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js";

import ImageKit, { toFile } from "@imagekit/nodejs";
import userModel from "../models/user.model.js";

// const privatekey = process.env.IMAGEKIT_PRIVATE_KEY;

// connect backend server to imageKIt
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  console.log(req.user);
  // console.log(user)

  // console.log(req.body);
  // console.log(req.file);

  try {
    //move image server to imageKitCloud server
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      // fileName: "image",
      fileName:req.file.originalname,
      folder:"chorat-2-insta-clone"

    });
    // console.log(file)
    // res.send(file);

    const newPost = new postModel({
      user: user._id,
      caption: req.body.caption,
      img_Url: file.url,
    });

    user.posts.push(newPost._id);

    await newPost.save();
    await user.save();

    return res.status(201).json({
      success: true,
      newPost,
      message: "post create successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//  allPost

const allPostController= async (req,res)=>{

  const allUserPost= await postModel.find()
  // console.log(allUserPost)
  
 return res.status(200).json({message:" all users posts get successfully ",
  allUserPost
 })

}


// ! userpost =>only  get post by user which user login
//! 1 method
// const userPost = async (req,res)=>{

//   const allPost= await userModel.findOne({_id:req.user.userId}).populate('posts')
//   console.log(allPost.posts)
//   return res.status(200).json({
//     message:"user all post which is posted by  login user",
//     allPost
//   })
// }

//?2 method
const userPostController = async (req,res)=>{

  const posts= await postModel.find({user:req.user.userId})
  // console.log(posts)
  return res.status(200).json({
    message:"user all post which is posted by  login user",
    posts
  })
}



//! get post details

const postDetailsController = async (req,res)=>{

  
try {
  const {postid} = req.params
   
  
  // {_id:req.params.postid}

  const postDetails = await postModel.findById(postid)
  console.log(postDetails)

 if(!postDetails){
  return res.status(404).json({message:"postdetails not found"})
 }

  console.log(req.user.userId)
  console.log(postDetails.user.toString())

 
  if(req.user.userId !== postDetails.user.toString()){
    return  res.status(403).json({message:"Forbidden content"})
  }
  
  return res.status(200).json({

    success:true,
    message:" get post details successfully",
    postDetails


  })
  
} catch (error) {
  return res.status(500).json({ message: error.message });
}


}




export default { createPostController ,userPostController ,allPostController,postDetailsController};

