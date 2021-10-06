import mongoose from 'mongoose'
import { isEmail } from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Provide user name'],
  },
  photo: String,
  email: {
    type: String,
    required: [true, 'Provide unique email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please provide valid email'],
  },
  password: {
    type: String,
    required: [true, 'Provide password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Provide confirm password'],
    validate: {
      validator: function validator(value) {
        return this.password === value
      },
      message: 'Passwords did not match!!',
    },
  },
})

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
  next()
})

userSchema.methods.isCorrectPassword = async function isCorrectPassword(
  providedPassword,
  userPassword
) {
  const isSame = await bcrypt.compare(providedPassword, userPassword)
  return isSame
}

const User = mongoose.model('users', userSchema)

export default User
