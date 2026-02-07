import express from 'express'
import authController from '../controllers/auth.conroller.js'

const router = express.Router();

router.post("/auth/register", authController.register)



export default router;