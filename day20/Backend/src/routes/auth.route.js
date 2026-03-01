import express from 'express'
import authController from '../controllers/auth.controller.js'
import  isloggin from '../middleware/auth.middleware.js'



const authRouter = express.Router()

/**
 *  POST  /api/auth/register
 */
authRouter.post('/register',authController.register)

/**
 * POST /api/auth/login
 */
authRouter.post('/login',authController.login)

/**
 * 
 * @route POST /api/auth/get-me
 * @desc get user details
 * @access private
 */
authRouter.get('/get-me',isloggin,authController.getMeController)
 

export default authRouter