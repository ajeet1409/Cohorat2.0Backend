import express from 'express'

import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const authRoute= express.Router() 

/**
 * @route POST /api/auth/reegister
 * @des register the user in application
 * 
 */

authRoute.post('/register',authController.register)


/**
 * @route POST /api/auth/login
 * @des  login the user 
 */
authRoute.post('/login',authController.login)

/**
 * @route GET /api/auth/get-me  [private]
 * @des  only  user login  data fetch
 * 
 */

authRoute.get('/get-me',authMiddleware.isIdentifyUser, authController.getMe)

/**
 * @route get /api/auth/logout
 * @des logout successfully
 */

authRoute.get('/logout',authController.logoutUser)


export default authRoute;