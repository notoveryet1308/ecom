import mongoose from 'mongoose'
import { productSchema } from './product'

const fashionSizeSchema = new mongoose.Schema({
  display: {
    type: String,
    required: [true, 'Provide size display name'],
  },
  value: {
    type: String,
    required: [true, 'Provie size detail'],
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
  idealFor: {
    type: String,
    required: [true, 'this clothe is ideal for info is required.'],
    enum: ['men', 'women'],
  },
  availableSize: {
    type: [fashionSizeSchema],
    required: [true, 'provide all available sizes.'],
    default: undefined,
  },
  size: {
    type: [String],
    required: [true, 'Provie size values'],
    default: undefined,
  },
})

const FashionProduct = mongoose.model('fashoin-product', fashionSchema)

export default FashionProduct
