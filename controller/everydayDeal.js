import ProductModel from '../model'
import CatchAsync from '../utils/CatchAsync'

const createProductInOffer = CatchAsync(async (req, res, next) => {
  const { productType } = req.params
  const Product = ProductModel[productType]
  const product = await Product.create(req.body)

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  })
})

const getAllProductInOffer = CatchAsync(async (req, res, next) => {

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     product,
  //   },
  // })
})