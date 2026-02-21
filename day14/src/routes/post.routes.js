import express from "express";
import postController from '../controllers/post.controller.js' 

const postRouter =express.Router()
/**
 * Post /api/posts [protected]
 * 
 * (protected route)
 * req.body ={caption,umg_url}
 */
import multer from "multer";

import isloggin from "../middleware/auth.js";

const storage = multer.memoryStorage()
const upload= multer({storage:storage})

postRouter.post('/',isloggin,upload.single('image'),postController.createPostController)

/**
 * Get /api/posts/ [protected]
 */
postRouter.get('/',isloggin,postController.userPostController)

/**
 * Get /api/posts/allUserPosts
 */

postRouter.get('/allUserPost',postController.allPostController)
/**
 * Get /api/posts/details/:postid
 */
// return  an detail about specific post with id also check wheather the post  belong to the user that is requesting come from 

postRouter.get('/details/:postid',isloggin,  postController.postDetailsController)


export default postRouter;