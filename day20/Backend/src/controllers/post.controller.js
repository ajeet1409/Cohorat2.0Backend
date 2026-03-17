import "../config/env.js";
// import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js";

import userModel from "../models/user.model.js";
import likeModel from "../models/like.model.js";

import ImageKit, { toFile } from "@imagekit/nodejs";
// const privatekey = process.env.IMAGEKIT_PRIVATE_KEY;

// connect backend server to imageKIt
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * @route Post /api/posts
 * @description create a new posts
 * @access private
 *
 *
 */

const createPostController = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  if(!user){
    return res.status(401).json({message:"user is not authorized"})
  }
  console.log(req.user);
  // console.log(user)

  console.log(req.body);
  console.log(req);

  try {
    //move image server to imageKitCloud server
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      // fileName: "image",
      fileName: req.file.originalname,
      folder: "chorat-2-insta-clone",
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

/**
 * @route get allPost /api/posts/allPosts
 *  / @des feed api
 * @access private
 *
 **/
const allPostController = async (req, res) => {
  const userId = req.user.userId;
  
  const allUserPost = await Promise.all(
    ((await postModel.find().populate("user", "-password").lean())).map(async (post) => {

      // .sort({_id:-1}) for sorting
      /**
       ** console.log(typeof post) =>mongooseObject  does not add new property 
       * *but using lean() to convert mongoose object to regular object to add property
       */
      
      const isLiked = await likeModel.findOne({
        user: userId,
        post: post._id,
      });

      // post.isLiked=Boolean(isLiked)
      //* !!(not operator) convert to boolean 
      post.isLiked = !!isLiked; 
      

      return post;
    }),
  );
  console.log(allUserPost)

  return res
    .status(200)
    .json({ message: " all users posts get successfully ", allUserPost });
};

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
const userPostController = async (req, res) => {
  const posts = await postModel.find({ user: req.user.userId });
  // console.log(posts)
  return res.status(200).json({
    message: "user all post which is posted by  login user",
    posts,
  });
};

//! get post details

const postDetailsController = async (req, res) => {
  try {
    const { postid } = req.params;

    // {_id:req.params.postid}

    const postDetails = await postModel.findById(postid);
    console.log(postDetails);

    if (!postDetails) {
      return res.status(404).json({ message: "postdetails not found" });
    }

    console.log(req.user.userId);
    console.log(postDetails.user.toString());

    if (req.user.userId !== postDetails.user.toString()) {
      return res.status(403).json({ message: "Forbidden content" });
    }

    return res.status(200).json({
      success: true,
      message: " get post details successfully",
      postDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @route post api/user/likes/:postId
 */

const creatingLikePost = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "post  is required" });
  }

  const postId = await postModel.findById(req.params.id);
  //! 1.post id exit
  if (!postId) {
    return res.status(404).json({ message: "post  not found in post model" });
  }

  //! 2
  const alreadyLiked = await likeModel.findOne({
    post: req.params.id,
    user: req.user.userId,
  });

  if (alreadyLiked) {
    return res.status(409).json({
      message: "Post already liked",
    });
  }

  //! create like post
  const like = await likeModel.create({
    post: req.params.id,
    user: req.user.userId,
  });

  return res.status(201).json({ message: "like the post successfully", like });
};

/**
 *  @route delete /api/user/unlike/:postId
 */

const unLikePost=async(req,res)=>{
  
   if (!req.params.id) {
    return res.status(400).json({ message: "post  is required" });
  }

  const postId = await postModel.findById(req.params.id);
  //! 1.post id exit
  if (!postId) {
    return res.status(404).json({ message: "post  not found in post model" });
  }

   const isLiked = await likeModel.findOne({
    post: req.params.id,
    user: req.user.userId,
  });

  if (!isLiked) {
    return res.status(409).json({
      message: "user did not like the post",
    });
  }
  await likeModel.findOneAndDelete({
    _id:isLiked._id

  })

  return res.status(200).json({message:'unlike the post successfully'})

}

/**
 * @route /api/posts/likesCount/:id
 */
const getLikeCount = async (req, res) => {
  const likecount = await likeModel.countDocuments({ post: req.params.id });

  if (likecount == 0) {
    return res.status(404).json({ message: "user does not like any post" });
  }

  return res.status(200).json({ message: "total  post likescount", likecount });
};

export default {
  createPostController,
  userPostController,
  allPostController,
  postDetailsController,
  creatingLikePost,
  getLikeCount,
  unLikePost
};
