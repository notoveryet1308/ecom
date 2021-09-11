import ProductModels from '../model'
import EverydayOffer from '../model/everyDayOffer'
import ProductList from '../model/productList'
import AppError from '../utils/AppError'
import catchAsync from '../utils/CatchAsync'

const createProduct = catchAsync(async (req, res, next) => {
  const { productType } = req.params
  const Product = ProductModels[productType]
  const product = await Product.create(req.body)

  await ProductList.create({ product: product._id, productType: product.type })
  if (product.isDealOfTheDay) {
    await EverydayOffer.create({
      product: { ...req.body },
      productId: product._id,
    })
  }
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  })
})

const getProduct = catchAsync(async (req, res, next) => {
  const { productType, id } = req.params
  const Product = ProductModels[productType]
  const product = await Product.findById(id)
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

const getEverydayInOfferProducts = catchAsync(async (req, res, next) => {
  const inOfferProduct = await EverydayOffer.find({})
  res.status(200).json({
    status: 'success',
    data: inOfferProduct,
  })
})

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getEverydayInOfferProducts,
}
