import express from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from '../controller/product'

const router = express.Router()

router.route('/:productType').post(createProduct)
router
  .route('/:productType/:id')
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getProduct)

export default router
