import express from 'express'
import * as auth from '../middlewares/auth.js'
import admin from '../middlewares/admin.js'
import { create, get, getAll, updateConfirmation, getReservation } from '../controllers/reservations.js'

const router = express.Router()

router.post('/', auth.jwt, create)
router.get('/', auth.jwt, get)
router.get('/:id', auth.jwt, getReservation)
router.get('/all', auth.jwt, admin, getAll)
router.patch('/:id', auth.jwt, admin, updateConfirmation)

export default router
