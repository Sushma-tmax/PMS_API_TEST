import { Router } from 'express'
import {
  register,
  forgotPassword,
  login,
  logout,
  resetPassword,
  verifyEmail
} from '../controllers/user/auth/authController'

import {authenticateUser } from '../middleware/authentication'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', authenticateUser, logout)
router.post('/verify-email', verifyEmail)
router.post('/reset-password', resetPassword)
router.post('/forgot-password', forgotPassword)

export default router

