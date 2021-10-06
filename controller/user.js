import JWT from 'jsonwebtoken'
import User from '../model/user'
import AppError from '../utils/AppError'
import catchAsync from '../utils/CatchAsync'

const getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find({})
  res.status(200).json({
    status: 'success',
    data: users,
  })
})

const getOneUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findById(userId)
  if (!user) {
    return next(new AppError('user not found !!'), 404)
  }
  res.status(200).json({
    status: 'success',
    data: user,
  })
})

const getUserAndVerify = catchAsync(async (req, res, next) => {
  const { token } = req.query
  const { id } = JWT.decode(token, process.env.JWT_SECRET)
  const user = await User.findById(id).select('-password')
  if (!id || !user) {
    return next(new AppError('token is not valid or user do not exists !'))
  }

  res.status(200).json({
    status: 'success',
    data: user,
  })
})

export { getAllUser, getOneUser, getUserAndVerify }
