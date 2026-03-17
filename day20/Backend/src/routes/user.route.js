import express from 'express'
import userController from '../controllers/user.controller.js'
import isloggin from '../middleware/auth.middleware.js'


const userRouter = express.Router()

userRouter.post('/follow-request/:id',isloggin,  userController.sendfollowUserController)

/**
 * @route PUT api/users//follow-request/accept/:id
 * @description accepted the request
 *
 *
 */
userRouter.put('/follow-request/accept/:id',isloggin,  userController.acceptRequest)

/**
 * @route PUT /pai/users/follow-request/reject/:_id
 * @des reject the request
 */

userRouter.put('/follow-request/reject/:id',isloggin,  userController.rejectRequest)

userRouter.delete('/unfollow/:id',isloggin,userController.unfollowUserController)
userRouter.get('/followers',isloggin, userController.getFollowerController)
userRouter.get('/followee',isloggin, userController.getFollowingController)


export default userRouter