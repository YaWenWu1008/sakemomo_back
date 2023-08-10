import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole.js'

const schema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, '帳號必填'],
    minlength: [4, '帳號太短'],
    maxlength: [20, '帳號太長'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '格式錯誤']
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, '信箱必填'],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value)
      },
      message: '信箱格式錯誤'
    }
  },
  phoneNumber: {
    type: String,
    required: [true, '手機號碼必填'],
    match: [/^09\d{8}$/, '手機格式錯誤']
  },
  tokens: {
    type: [String],
    default: []
  },

  role: {
    type: Number,
    default: UserRole.USER
  }
}, { versionKey: false })

schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length < 4) {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidationError({ message: '密碼太短' }))
      next(error)
      return
    } else if (user.password.length > 20) {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidationError({ message: '密碼太長' }))
      next(error)
      return
    } else {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

schema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length < 4) {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidationError({ message: '密碼太短' }))
      next(error)
      return
    } else if (user.password.length > 20) {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidationError({ message: '密碼太長' }))
      next(error)
      return
    } else {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

export default mongoose.model('users', schema)
