import express from 'express'
import {
  getAppointmentsByDateController,
  getMonthlyAppointmentCountsController,
  checkAvailabilityController,
  getAppointmentsController,
  getAppointmentController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController
} from '../controllers/appointmentController.js'
import validateToken from '../middlewares/authMiddleware.js'
import logHeaders from '../middlewares/logMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(logHeaders)

router.get(
  '/by-date',
  validateToken,
  roleMiddleware('appointments', 'read'),
  getAppointmentsByDateController
)

router.get(
  '/monthly-counts',
  validateToken,
  roleMiddleware('appointments', 'read'),
  getMonthlyAppointmentCountsController
)

router.get(
  '/check-availability',
  validateToken,
  roleMiddleware('appointments', 'read'),
  checkAvailabilityController
)
router.get(
  '/', validateToken,
  roleMiddleware('appointments', 'read'),
  getAppointmentsController
)

router.get(
  '/:id', validateToken,
  roleMiddleware('appointments', 'read'),
  getAppointmentController
)

router.post(
  '/', validateToken,
  roleMiddleware('appointments', 'create'),
  createAppointmentController
)

router.put(
  '/:id', validateToken,
  roleMiddleware('appointments', 'update'),
  updateAppointmentController
)

router.delete(
  '/:id', validateToken,
  roleMiddleware('appointments', 'delete'),
  deleteAppointmentController
)

export default router
