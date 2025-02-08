import express from 'express'
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/appointmentController.js'
import validateToken from '../middlewares/authMiddleware.js'
import logHeaders from '../middlewares/logMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(logHeaders)

router.get(
  '/', validateToken,
  roleMiddleware('appointments', 'read'),
  getItems
)

router.get(
  '/:id', validateToken,
  roleMiddleware('appointments', 'read'),
  getItem
)

router.post(
  '/',
  validateToken,
  roleMiddleware('appointments', 'create'),
  createItem
)

router.put(
  '/:id',
  validateToken,
  roleMiddleware('appointments', 'update'),
  updateItem
)

router.delete(
  '/:id',
  validateToken,
  roleMiddleware('appointments', 'delete'),
  deleteItem
)

export default router
