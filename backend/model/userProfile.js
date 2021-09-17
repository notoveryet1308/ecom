import mongoose from 'mongoose'
import { addressSchema } from './orderProduct'

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Provide user-id '],
  },
  orders: {
    type: [mongoose.Types.ObjectId],
    required: [true, 'Provide ordered product'],
  },
  address: {
    type: [addressSchema],
  },
})

const UserProfile = mongoose.model('userProfile', profileSchema)

export default UserProfile
