import express from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getEverydayInOfferProducts,
} from '../controller/product'

const router = express.Router()

router.route('/:productType').post(createProduct)
router
  .route('/:productType/:id')
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getProduct)

router.route('/deal-of-the-day').get(getEverydayInOfferProducts)

export default router
