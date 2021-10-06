import mongoose from 'mongoose'
import { productSchema, keyValueSchema } from './product'

const featureSchema = {
  detail: {
    type: String,
    required: [true, 'Product specification detail is required'],
    trim: true,
  },
  photo: String,
}

const specificationSchema = {
  category: {
    type: String,
    required: [true, 'Prouct specification category is required'],
  },
  list: {
    type: [keyValueSchema],
    required: [true, 'Provide specification list'],
    default: undefined,
  },
}

const electronicsSchema = new mongoose.Schema({
  ...productSchema,
  description: { type: String, required: [true, 'Provide prouct description'] },
  feature: [featureSchema],
  highlights: {
    type: [String],
    required: [true, 'Provide product highlight'],
  },
  specifications: [specificationSchema],
})

const Electronics = mongoose.model('electronics-product', electronicsSchema)
export default Electronics
