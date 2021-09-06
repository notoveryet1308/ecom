import JWT from 'jsonwebtoken'
import User from '../model/user'
import AppError from '../utils/AppError'
import catchAsync from '../utils/CatchAsync'

const generateToken = (id) =>
  JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)
  const token = generateToken(user._id)
  res.status(201).json({
    status: 'success',
    token,
  })
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new AppError('Provide both email & password', 400))
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError('Invalid email or password!', 401))
  }
  const token = generateToken(user._id)
  res.status(200).json({
    status: 'success',
    token,
  })
})

export { signup, login }
