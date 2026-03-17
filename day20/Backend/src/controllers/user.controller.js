import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

/**
 * follow
 *
 * @route Post /api/users/follow/:id
 * @description follow a user
 * @access  private
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const sendfollowUserController = async (req, res) => {
  try {
    const followerId = req.user.userId; // login user ka id
    // console.log(followerId)

    //if normal destructure
    const { id } = req.params;

    const followingId = req.params.id; // jise follow kar rahe  hai ushaki id
    // console.log(followingId)

    //! 1 check id exit
    if (!followingId) {
      return res.status(400).josn({ message: "Following user id required" });
    }

    // !2 Prevent self follow
    if (followerId === followingId) {
      return res.status(400).json({ message: "you can not follow  yourself" });
    }

    // !3. Check user exists
    const isFolloweeExit = await userModel.findById(followingId);

    if (!isFolloweeExit) {
      return res.status(409).json({
        message: "you are trying to follow does not exit in user model",
      });
    }

    const alreadyFollowing = await followModel.findOne({
      follower: followerId,
      followee: followingId,
    });

    if (alreadyFollowing) {
      if (alreadyFollowing.status == "pending") {
        return res.status(409).json({
          message: "pending request",
        });
      } else if (alreadyFollowing.status == "accepted") {
        return res.status(200).json({
          message: "you are now following",
        });
      } else if ((alreadyFollowing.status = "rejected")) {
        return res.status(400).json({
          message: "reject the request",
        });
      }
    }

    const follow = new followModel({
      follower: followerId,
      followee: followingId,
      status: "pending",
    });

    await follow.save();

    return res.status(201).json({ message: " send request  successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

/**
 * @route put api/users/accept/:id
 * @description accepted the request
 *
 *
 */
const acceptRequest = async (req, res) => {
  const requestId = req.params.id;
  

  const alreadyAccept = await followModel.findById(requestId);
 
  if (alreadyAccept.status == "accepted") {
    return res.status(200).json({ message: "already accept the request" });
  }

 
  const acceptRequest = await followModel.findByIdAndUpdate(
    requestId,
    {
      status: "accepted",
    },
    {
      new: true, // return the updated value
    },
  );
  console.log(acceptRequest);

  return res
    .status(200)
    .json({ message: "accepted the request" }, acceptRequest);
};

const rejectRequest = async (req, res) => {
  const requestId = req.params.id;
  consol.log(requestId)
  const alreadyReject = await followModel.findById(requestId);
  if (alreadyReject.status == "rejected") {
    return res.status(200).json({ message: "already areject the request" });
  }

  const rejectRequest = await followModel.findByIdAndUpdate(
    requestId,
    {
      status: "rejected",
    },
    {
      new: true, // return the updated value
    },
  );
  console.log(acceptRequest);

  return res
    .status(200)
    .json({ message: "reject  the request" }, rejectRequest);
};

/**
 *
 * unfollow
 *  @route  Delete /api/users/unfollow/:id
 * @description unfollow a user
 * @access private
 *
 */

const unfollowUserController = async (req, res) => {
  const followerId = req.user.userId;
  const followingId = req.params.id;

  //!if not exit means not following
  const isUserFollowing = await followModel.findOne({
    follower: followerId,
    followee: followingId,
  });
  console.log(isUserFollowing);

  if (!isUserFollowing) {
    return res
      .status(200)
      .json({ message: "you are not following to particular user " });
  }

  //

  // await followModel.findOneAndDelete({
  //   $and: [
  //     {
  //       follower: followerId,
  //     },
  //     {
  //       followee: followingId,
  //     },
  //   ],
  // });

  await followModel.findByIdAndDelete(isUserFollowing._id);

  return res.json({ message: "unfollow successfully" });
};

/**
 *  getFollower
 *  @route Get /api/users/follower
 * @description get all follower to this user
 * @access private
 *
 */

const getFollowerController = async (req, res) => {
  const follower = await followModel.find({ followee: req.user.userId });
  console.log(follower);

  if (follower.length == 0) {
    return res.status(404).json({ message: "zero follower to this  user" });
  }

  return res.status(200).json({
    message: "follower get successfully",
    follower,
  });
};

/**
 * getFollowing
 *  @route Get =>  /api/users/following
 * @description get all following to this user
 * @access private
 */

const getFollowingController = async (req, res) => {
  const following = await followModel.countDocuments({
    follower: req.user.userId,
  });

  console.log(following);
  if (following == 0) {
    return res.status(404).json({ message: " following to zero" });
  }

  return res
    .status(200)
    .json({ message: "following get successfully", following });
};
export default {
  sendfollowUserController,
  acceptRequest,
  rejectRequest,
  unfollowUserController,
  getFollowerController,
  getFollowingController,
};
