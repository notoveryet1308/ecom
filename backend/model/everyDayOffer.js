import mongoose from 'mongoose'

const everydaySchema = new mongoose.Schema({
  product: { type: Object, required: [true, 'Provide Product detail'] },
  productId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Provide product id'],
  },
})

const EverydayOffer = mongoose.model('everyday-offer', everydaySchema)

export default EverydayOffer
