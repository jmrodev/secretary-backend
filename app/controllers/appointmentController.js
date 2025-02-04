import httpError from '../helpers/handleErrors.js'
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../repositories/appointmentRepository.js'

const getItems = async (req, res) => {
  try {
    const resDetail = await getAllAppointments()
    res.status(200).json({
      data: resDetail,
      message: 'Appointments found',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Server error',
      success: false
    })
  }
}

const getItem = async (req, res) => {
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
      message: 'Server error',
      success: false
    })
  }
}

const createItem = async (req, res) => {
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
      message: 'Server error',
      success: false
    })
  }
}

const updateItem = async (req, res) => {
  try {
    const resDetail = await updateAppointment(req.params.id, req.body)
    if (!resDetail) {
      return res.status(404).json({
        message: 'Appointment not found',
        success: false
      })
    }
    res.status(200).json({
      data: resDetail,
      message: 'Appointment updated',
      success: true
    })
  } catch (error) {
    httpError(res, error)
    res.status(500).json({
      message: 'Server error',
      success: false
    })
  }
}

const deleteItem = async (req, res) => {
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
      message: 'Server error',
      success: false
    })
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem }
