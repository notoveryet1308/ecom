import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'provide user id'],
  },
  productId: {
    type: [mongoose.Types.ObjectId],
    required: [true, 'provide ordered product id'],
  },
})

const Order = mongoose.model('ordered-product', orderSchema)
export default Order
