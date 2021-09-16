import express from 'express'
import { createOrder, getOrderedProduct } from '../controller/orderProduct'

const router = express.Router()

router.route('/').post(createOrder)
router.route('/:userId').get(getOrderedProduct)

export default router
