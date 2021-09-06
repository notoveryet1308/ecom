import express from 'express'
import { createProduct } from '../controller/product'

const router = express.Router()

router.route('/:productType').post(createProduct)
router.route('/clothing').get()

export default router
