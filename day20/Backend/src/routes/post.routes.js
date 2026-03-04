import express from "express";
import postController from "../controllers/post.controller.js";

const postRouter = express.Router();
/**
 * @route Post /api/posts [protected]
 * @description create a post
 *
 * (protected route)
 * req.body ={caption,umg_url}
 */
import multer from "multer";

import isloggin from "../middleware/auth.middleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.post(
  "/",
  isloggin,
  upload.single("image"),
  postController.createPostController,
);

/**
 *  @route Get /api/posts/ [protected]
 * @description  get user posts only
 * @access    private
 *
 */
postRouter.get("/", isloggin, postController.userPostController);

/**
 *  @route Get /api/posts/allUserPosts
 * @description //get all post in DB
 * @access private
 */

postRouter.get("/allUserPost", isloggin, postController.allPostController);

/**
 * @route Get /api/posts/details/:postid
 * @description return  an detail about specific post with id also check wheather the post  belong to the user that is requesting come from
 */
postRouter.get(
  "/details/:postid",
  isloggin,
  postController.postDetailsController,
);

/**
 * @route post /api/posts/like/:id
 * @description  user like the post
 * @access private
 */

postRouter.post("/like/:id", isloggin, postController.creatingLikePost);

/**
 * @routes /api/posts/likesCount
 * @description count the like
 * @access private
 *
 */

postRouter.get("/likesCount/:id", isloggin, postController.getLikeCount);

export default postRouter;
