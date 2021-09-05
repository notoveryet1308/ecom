import express from 'express'
import { createProduct } from '../controller/product'

const router = express.Router()

router.route('/:productType').post(createProduct)

export default router
