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
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(logHeaders)

router.post(
  '/login',
  loginUser
)

router.post(
  '/logout',
  validateToken,
  logoutUser
)

router.post(
  '/register',
  validateToken,
  roleMiddleware('users', 'create'),
  registerUser
)

router.get(
  '/',
  validateToken,
  roleMiddleware('users', 'read'),
  getItems
)

router.get(
  '/:id',
  validateToken,
  roleMiddleware('users', 'read'),
  getItem)

router.post(
  '/',
  validateToken,
  roleMiddleware('users', 'create'),
  createItem)

router.put(
  '/:id',
  validateToken,
  roleMiddleware('users', 'update'),
  updateItem)

router.delete(
  '/:id',
  validateToken,
  roleMiddleware('users', 'delete'),
  deleteItem
)

router.get(
  '/current',
  validateToken,
  (req, res) => {
    res.status(200).json({
      user: req.user, // Assuming req.user is set by the validateToken middleware
      message: 'Current user retrieved successfully',
      success: true
    })
  }
)

export default router
