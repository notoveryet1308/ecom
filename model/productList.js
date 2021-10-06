import mongoose from 'mongoose'

const productListSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Provide Id of the product '],
  },
  productType: { type: String, required: [true, 'Provide productType'] },
})

const ProductList = mongoose.model('product-list', productListSchema)

export default ProductList
