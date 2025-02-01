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

router.get('/', getItems)

router.get('/:id', getItem)

router.post(
  '/',
  //  validateToken,
  createItem
)

router.put('/:id', updateItem)

router.delete('/:id', deleteItem)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

export default router
