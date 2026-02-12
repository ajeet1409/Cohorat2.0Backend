import express from 'express'
import authController from '../controllers/auth.conroller.js'
import loginLimiter from '../middleware/rateLimit/loginLimiter.js';

const router = express.Router();



/**
 * 
 * /api/auth/register
 */
router.post("/auth/register", authController.register)

/**
 * 
 * /api/auth/login
 */
router.post("/auth/login",loginLimiter, authController.login)



export default router;