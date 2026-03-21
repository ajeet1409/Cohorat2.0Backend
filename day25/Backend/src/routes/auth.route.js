import express from 'express'

import authController from '../controllers/auth.controller.js'

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


export default authRoute;