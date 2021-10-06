import FashionProduct from '../model/fashion'
import catchAsync from '../utils/CatchAsync'
import AppError from '../utils/AppError'
import ApiFeatures from '../utils/ApiFeatures'

const getAllFashionProduct = catchAsync(async (req, res, next) => {
  const processedProduct = new ApiFeatures(
    FashionProduct.find(),
    req.query
  ).filter()

  const products = await processedProduct.query
  res.status(200).json({
    status: 'success',
    length: products.length,
    data: {
      products,
    },
  })
})

const getFashionProduct = catchAsync(async (req, res, next) => {
  const product = await FashionProduct.findById({ _id: req.params.id })
  if (product) {
    return res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    })
  }

  return next(new AppError('Invalid product id', 400))
})

export { getAllFashionProduct, getFashionProduct }
