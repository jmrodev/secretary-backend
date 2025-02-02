import express from 'express'
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/usersController.js'
import validateToken from '../middlewares/authMiddleware.js'
import logHeaders from '../middlewares/logMiddleware.js'

const router = express.Router()

router.use(logHeaders)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/', validateToken, getItems)
router.get('/:id', validateToken, getItem)
router.post('/', validateToken, createItem)
router.put('/:id', validateToken, updateItem)
router.delete('/:id', validateToken, deleteItem)
router.post('/register', validateToken, registerUser)

export default router
