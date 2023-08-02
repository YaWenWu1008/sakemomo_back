import express from 'express'
import { create, get, getAll, getId, edit, cancel } from '../controllers/reservations'

const router = express.Router()

router.post('/reservations', create)
router.get('/reservations', get)
router.get('/reservations/all', getAll)
router.get('/reservations/:id', getId)
router.patch('/reservations/:id', edit)
router.delete('/reservations/:id/cancel', cancel)

export default router
