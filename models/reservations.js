import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
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

export default mongoose.model('reservations', schema)
