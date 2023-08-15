import reservation from '../models/reservations.js'
import { StatusCodes } from 'http-status-codes'
import { getMessageFromValidationError } from '../utils/error.js'

export const create = async (req, res) => {
  try {
    const result = await reservation.create({
      user: req.user._id,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      peopleNumber: req.body.peopleNumber,
      dateTime: req.body.dateTime
    })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.log(error)
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
    const result = await reservation.find({ user: req.user._id }).populate('user')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    console.error('Error in create:', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '發生錯誤'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await reservation.find().populate('user')
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

export const updateConfirmation = async (req, res) => {
  try {
    const { id } = req.params
    const { confirmed } = req.body

    const reservations = await reservation.findByIdAndUpdate(
      id,
      { confirmed },
      { new: true }
    )

    if (!reservations) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '找不到'
      })
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: '已確認訂位',
      result: {
        confirmed: reservations.confirmed
      }
    })
  } catch (error) {
    console.error('Error in create:', error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '發生錯誤'
    })
  }
}
