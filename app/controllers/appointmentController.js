// Nuevos controladores a agregar en appointmentController.js

import httpError from '../helpers/handleErrors.js'
import {
  getAppointmentsByDate,
  getMonthlyAppointmentCounts,
  checkTimeSlotAvailability,
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../repositories/appointmentRepository.js'
const getAppointmentsByDateController = async (req, res) => {
  const { year, month, day } = req.query

  try {
    if (!year || !month || !day) {
      return res.status(400).json({
        message: 'Year, month, and day are required',
        success: false
      })
    }

    const appointments = await getAppointmentsByDate(
      parseInt(year),
      parseInt(month),
      parseInt(day)
    )

    res.status(200).json({
      data: appointments,
      message: 'Appointments for date retrieved',
      success: true
    })
  } catch (error) {
    if (error.message.includes('Fecha inválida')) {
      return res.status(400).json({
        message: error.message,
        success: false
      })
    }
    httpError(res, error)
  }
}

const getMonthlyAppointmentCountsController = async (req, res) => {
  const { year, month } = req.query

  try {
    if (!year || !month) {
      return res.status(400).json({
        message: 'Year and month are required',
        success: false
      })
    }

    const counts = await getMonthlyAppointmentCounts(
      parseInt(year),
      parseInt(month)
    )

    res.status(200).json({
      data: counts,
      message: 'Monthly appointment counts retrieved',
      success: true
    })
  } catch (error) {
    if (error.message.includes('Fecha inválida')) {
      return res.status(400).json({
        message: error.message,
        success: false
      })
    }
    httpError(res, error)
  }
}

const checkAvailabilityController = async (req, res) => {
  const { date, time } = req.query

  try {
    const isAvailable = await checkTimeSlotAvailability(new Date(date), time)

    res.status(200).json({
      data: { isAvailable },
      message: 'Time slot availability checked',
      success: true
    })
  } catch (error) {
    httpError(res, error)
  }
}

const getAppointmentsController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit

  try {
    const resDetail = await getAllAppointments().skip(skip).limit(limit)
    const total = await getAllAppointments().countDocuments()
    res.status(200).json({
      data: resDetail,
      message: 'Appointments found',
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}

const getAppointmentController = async (req, res) => {
  try {
    const resDetail = await getAppointmentById(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'Appointment not found', success: false })
    }
    res.status(200).json({
      data: resDetail,
      message: 'Appointment found',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}

const createAppointmentController = async (req, res) => {
  try {
    const resDetail = await createAppointment(req.body)
    res.status(201).json({
      data: resDetail,
      message: 'Appointment created',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}

const updateAppointmentController = async (req, res) => {
  try {
    const resDetail = await updateAppointment(req.params.id, req.body)
    if (!resDetail) {
      return res.status(404).json({ message: 'Appointment not found', success: false })
    }
    res.status(200).json({
      data: resDetail,
      message: 'Appointment updated',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}

const deleteAppointmentController = async (req, res) => {
  try {
    const resDetail = await deleteAppointment(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'Appointment not found', success: false })
    }
    res.status(200).json({
      message: 'Appointment deleted',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Internal Server Error',
      success: false
    })
  }
}

export {
  checkAvailabilityController,
  getMonthlyAppointmentCountsController,
  getAppointmentsByDateController,
  getAppointmentsController,
  getAppointmentController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController
}
