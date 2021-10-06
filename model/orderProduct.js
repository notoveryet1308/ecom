import mongoose from 'mongoose'

export const addressSchema = {
  name: {
    type: String,
    required: [true, 'Provide seller name '],
  },
  address: {
    type: String,
    required: [true, 'Provide seller`s address'],
  },
  city: {
    type: String,
    required: [true, 'Provide seller`s city name'],
  },
  zipCode: {
    type: Number,
    required: [true, 'Provide seller`s loction zip code'],
  },
}
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'provide user id'],
  },
  productId: {
    type: [mongoose.Types.ObjectId],
    required: [true, 'provide ordered product id'],
  },
  deliveryAddress: { ...addressSchema },
})

const Order = mongoose.model('ordered-product', orderSchema)
export default Order
