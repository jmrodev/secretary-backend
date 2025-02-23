import appointmentModel from '../models/appointmentModel.js'

const getAllAppointments = () => {
  return appointmentModel.find({}) // Return query without executing
}

const getAppointmentById = async (id) => {
  return await appointmentModel.findById(id)
}

const createAppointment = async (appointmentData) => {
  return await appointmentModel.create(appointmentData)
}

const updateAppointment = async (id, appointmentData) => {
  return await appointmentModel.findByIdAndUpdate(id, appointmentData, { new: true })
}

const deleteAppointment = async (id) => {
  return await appointmentModel.findByIdAndDelete(id)
}

export { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment }
