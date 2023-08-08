import reservations from '../models/reservations'
import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
import { getMessageFromValidationError } from '../utils/error.js'

export const create = async (req, res) => {
  try {
    const user = await users.findById(req.user._id)
    const result = await reservations.create({

      id: user._id,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      peopleNumber: req.body.peopleNumber,
      dateTime: req.body.dateTime,
      user: req.body._id
    })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    if (error.message === 'EMPTY') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '訂位為空'
      })
    } else if (error.name === 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: getMessageFromValidationError(error)
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '發生錯誤'
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    const result = await reservations.find({ user: req.user._id }).populate('reservation')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '發生錯誤'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await reservations.find().populate('reservation').populate('user', 'account')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '發生錯誤'
    })
  }
}

export const getId = async (req, res) => {
  try {
    const result = await reservations.findById(req.params.id)
    if (!result) {
      throw new Error('NOT FOUND')
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '發生錯誤'
      })
    }
  }
}

export const edit = async (req, res) => {
  try {
    const result = await reservations.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      phoneNumber: req.body.phoneNumber,
      peopleNumber: req.body.peopleNumber,
      date: req.body.date,
      time: req.body.time
    }, { new: true, runValidators: true })
    if (!result) {
      throw new Error('NOT FOUND')
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: getMessageFromValidationError(error)
      })
    } else if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '發生錯誤'
      })
    }
  }
}

export const cancel = async (req, res) => {
  try {
    const reservation = await reservations.findById(req.params.id)
    if (!reservation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到訂位資訊'
      })
    }

    reservation.isCancelled = true
    await reservation.save()

    return res.status(StatusCodes.OK).json({
      success: true,
      message: '訂位已取消'
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: getMessageFromValidationError(error)
      })
    } else if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '發生錯誤'
      })
    }
  }
}
