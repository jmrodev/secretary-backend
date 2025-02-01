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

const router = express.Router()

router.use(logHeaders)

router.get('/', getItems)

router.get('/:id', getItem)

router.post(
  '/',
  createItem
)

router.put('/:id', updateItem)

router.delete('/:id', deleteItem)

export default router
