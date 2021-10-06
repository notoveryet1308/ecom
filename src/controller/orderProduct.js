import catchAsync from '../utils/CatchAsync'
import Order from '../model/orderProduct'
import User from '../model/user'
import AppError from '../utils/AppError'

const createOrder = catchAsync(async (req, res, next) => {
  const { userId, productId } = req.body
  const userFound = await User.findById(userId)

  if (!userFound) {
    return next(new AppError('User do not exists', 404))
  }
  const userOrders = await Order.find({ userId })
  console.log({ userOrders, userFound })
  if (!userOrders.length) {
    const newOrders = await Order.create(req.body)
    return res.status(200).json({
      status: 'success',
      data: newOrders,
    })
  }

  const newOrders = await Order.findOneAndUpdate(
    { userId },
    { $push: { productId: productId } },
    { new: true }
  )
  res.status(200).json({
    status: 'success',
    data: newOrders,
  })
})

const getOrderedProduct = catchAsync(async (req, res, next) => {})

export { createOrder, getOrderedProduct }
