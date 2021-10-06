import express from 'express'
import { signup, login } from '../controller/auth'
import { getAllUser, getOneUser, getUserAndVerify } from '../controller/user'

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/').get(getAllUser)
router.route('/verify').get(getUserAndVerify)
router.route('/:userId').get(getOneUser)


export default router
