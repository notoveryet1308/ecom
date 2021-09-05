import mongoose from 'mongoose'
import { productSchema } from './product'

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

const productHighlightSchema = {
  label: {
    type: String,
    required: [true, 'Product highlight label is required'],
  },
  description: {
    type: String,
    required: [true, 'Product highlight description is required'],
    trim: true,
  },
}
const fashionSchema = new mongoose.Schema({
  ...productSchema,
  productDetail: [productHighlightSchema],
  sutiableFor: {
    type: String,
    required: [true, 'this clothe is sutiable for info is required.'],
    enum: ['men', 'women'],
  },
  sizes: {
    type: [fashionSizeSchema],
    required: [true, 'clothes sizes are required'],
    default: undefined,
  },
})

const FashionProduct = mongoose.model('fashoin-product', fashionSchema)

export default FashionProduct
