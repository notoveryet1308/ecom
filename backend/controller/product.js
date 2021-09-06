import ProductModels from '../model'
import AppError from '../utils/AppError'
import catchAsync from '../utils/CatchAsync'

const createProduct = catchAsync(async (req, res, next) => {
  const { productType } = req.params
  const Product = ProductModels[productType]
  const product = await Product.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  })
})

const updateProduct = catchAsync(async (req, res, next) => {
  const { productType, id } = req.params
  const Product = ProductModels[productType]
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    return next(new AppError('Invaild ID!', 400))
  }
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  })
})

const deleteProduct = catchAsync(async (req, res, next) => {
  const { productType, id } = req.params
  const Product = ProductModels[productType]
  const product = await Product.findByIdAndDelete(id)
  if (!product) {
    return next(new AppError('No product found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
  })
})

export { createProduct, updateProduct, deleteProduct }
