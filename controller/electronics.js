import ElectronicsProduct from '../model/electronics'
import catchAsync from '../utils/CatchAsync'
import AppError from '../utils/AppError'
import ApiFeatures from '../utils/ApiFeatures'

const getAllElectronicProduct = catchAsync(async (req, res, next) => {
  const processedProduct = new ApiFeatures(
    ElectronicsProduct.find(),
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

const getElectronicProduct = catchAsync(async (req, res, next) => {
  const product = await ElectronicsProduct.findById({ _id: req.params.id })
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

export { getAllElectronicProduct, getElectronicProduct }
