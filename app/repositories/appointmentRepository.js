import appointmentModel from '../models/appointmentModel.js'

const getAllAppointments = () => {
  return appointmentModel.find({})
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

const getAppointmentsByDate = async (year, month, day) => {
  const startDate = new Date(year, month, day, 0, 0, 0)
  const endDate = new Date(year, month, day, 23, 59, 59)

  return await appointmentModel.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ appointmentTime: 1 })
}

const getMonthlyAppointmentCounts = async (year, month) => {
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0)

  return await appointmentModel.aggregate([
    {
      $match: {
        date: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        count: { $sum: 1 }
      }
    }
  ])
}

const checkTimeSlotAvailability = async (date, time) => {
  const appointment = await appointmentModel.findOne({
    date,
    appointmentTime: time
  })
  return !appointment
}

export {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDate,
  getMonthlyAppointmentCounts,
  checkTimeSlotAvailability

}
