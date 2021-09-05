import mongoose from 'mongoose'
import { productSchema, productHighlightSchema } from './product'

const fashionSizeSchema = new mongoose.Schema({
  display: {
    type: String,
    required: [true, 'Provide size display name'],
  },
  value: {
    type: String,
    required: [true, 'Provie size value'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Provide availability status of this size'],
  },
})

const fashionSchema = new mongoose.Schema({
  ...productSchema,
  productDetail: [productHighlightSchema],
  sizes: {
    type: [fashionSizeSchema],
    required: [true, 'clothes sizes are required'],
    default: undefined,
  },
})

const FashionProduct = mongoose.model('fashoin-product', fashionSchema)

export default FashionProduct
