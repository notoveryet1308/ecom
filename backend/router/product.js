import express from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/product'

const router = express.Router()

router.route('/:productType').post(createProduct)
router.route('/:productType/:id').patch(updateProduct).delete(deleteProduct)

export default router
