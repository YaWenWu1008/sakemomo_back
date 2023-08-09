import express from 'express'
import * as auth from '../middlewares/auth.js'
import admin from '../middlewares/admin.js'
import { create, get, getAll } from '../controllers/reservations'

const router = express.Router()

router.post('/users/reservation', create)
router.get('/', auth.jwt, get)
router.get('/all', auth.jwt, admin, getAll)

export default router
