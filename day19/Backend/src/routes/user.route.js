import express from 'express'
import userController from '../controllers/user.controller.js'
import isloggin from '../middleware/auth.middleware.js'


const userRouter = express.Router()

userRouter.post('/follow/:id',isloggin,  userController.sendfollowUserController)
userRouter.put('/accept/:id',isloggin,  userController.acceptRequest)
userRouter.put('/reject/:id',isloggin,  userController.rejectRequest)

userRouter.delete('/unfollow/:id',isloggin,userController.unfollowUserController)
userRouter.get('/followers',isloggin, userController.getFollowerController)
userRouter.get('/followee',isloggin, userController.getFollowingController)


export default userRouter