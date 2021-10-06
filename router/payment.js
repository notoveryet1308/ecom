import express from 'express'
import payment from '../controller/payment'

const router = express.Router()

router.route('/').post(payment)

export default router
