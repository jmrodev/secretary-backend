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
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const getItem = async (req, res) => {
  try {
    const resDetail = await getAppointmentById(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const createItem = async (req, res) => {
  try {
    const resDetail = await createAppointment(req.body)
    res.status(201).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const updateItem = async (req, res) => {
  try {
    const resDetail = await updateAppointment(req.params.id, req.body)
    if (!resDetail) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(200).json({ data: resDetail })
  } catch (error) {
    httpError(res, error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const resDetail = await deleteAppointment(req.params.id)
    if (!resDetail) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(200).json({ message: 'Appointment deleted' })
  } catch (error) {
    httpError(res, error)
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem }
