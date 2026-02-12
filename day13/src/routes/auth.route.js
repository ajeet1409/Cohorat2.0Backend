import express from 'express'
import authController from '../controllers/auth.conroller.js'

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
router.post("/auth/login", authController.login)



export default router;