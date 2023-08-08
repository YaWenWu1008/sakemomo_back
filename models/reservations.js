import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '姓名必填']
  },
  phoneNumber: {
    type: String,
    required: [true, '電話必填']
  },
  peopleNumber: {
    type: Number,
    required: true
  },
  dateTime: {
    type: String,
    required: true
  }
}, { versionKey: false })

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  reservation: {
    type: [reservationSchema],
    default: [],
    validate: {
      validator(value) {
        return Array.isArray(value) && value.length > 0
      },
      message: '訂位不能為空'
    }
  }
}, { versionKey: false })

export default mongoose.model('reservations', schema)
