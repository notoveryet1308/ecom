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

export { getAllUser, getOneUser }
