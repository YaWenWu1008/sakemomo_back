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
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }

}, { versionKey: false })

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: [reservationSchema]
  }
})

export default mongoose.model('reservations', schema)
