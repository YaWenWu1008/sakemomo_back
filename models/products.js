import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  price: {
    type: Number,
    required: '缺少價格',
    min: [0, '價格太低']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['開胃小食', '生食&沙拉', '酒桃塔可', '燒物', '揚物', '食事&吸物', '甜點', '夜場限定', '酒'],
      message: '分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上架狀態']
  }
}, { versionKey: false })

export default mongoose.model('products', schema)
