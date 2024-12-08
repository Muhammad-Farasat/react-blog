import express, { Router } from 'express'
import { signup, login, adminLogin } from '../Controller/auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/adminlogin', adminLogin)

export default router