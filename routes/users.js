import express from 'express'
import contentType from '../middlewares/contentType.js'
import admin from '../middlewares/admin.js'
import { create, login, logout, extend, getProfile, getAll, get } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/', contentType('application/json'), create)
router.post('/login', contentType('application/json'), auth.login, login)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getProfile)
router.get('/all', auth.jwt, admin, getAll)
router.delete('/logout', auth.jwt, logout)
router.get('/', auth.jwt, get)

export default router
