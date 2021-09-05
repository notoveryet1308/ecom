import ProductModels from '../model'
import catchAsync from '../utils/catchAsync'

const createProduct = catchAsync(async (req, res, next) => {
  console.log({ param: req.params, body: req.body })
  const { productType } = req.params
  const Product = ProductModels[productType]
  console.log({Product});
  const product = await Product.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  })
})

const getAllProduct = async (req, res, next) => {}
export { createProduct, getAllProduct }
