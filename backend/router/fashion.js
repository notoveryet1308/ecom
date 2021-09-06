import express from 'express'
import { getAllFashionProduct, getFashionProduct } from '../controller/fashion'

const router = express()

router.route('/').get(getAllFashionProduct)
router.route('/:id').get(getFashionProduct)

export default router
