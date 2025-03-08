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
  // Check if parameters exist
  if (!year || !month || !day) {
    throw new Error('Fecha inválida: year, month, and day are required')
  }

  // Parse and validate numeric values
  const yearNum = parseInt(year)
  const monthNum = parseInt(month)
  const dayNum = parseInt(day)

  if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
    throw new Error('Fecha inválida: year, month, and day must be valid numbers')
  }

  // Validate year range (reasonable range for appointments)
  if (yearNum < 2000 || yearNum > 2100) {
    throw new Error('Fecha inválida: year must be between 2000 and 2100')
  }

  // Validate month range (1-12)
  if (monthNum < 1 || monthNum > 12) {
    throw new Error('Fecha inválida: month must be between 1 and 12')
  }

  // Validate day range (1-31)
  if (dayNum < 1 || dayNum > 31) {
    throw new Error('Fecha inválida: day must be between 1 and 31')
  }

  // Adjust for JavaScript's 0-based months (0-11)
  const adjustedMonth = monthNum - 1

  // Create dates
  const startDate = new Date(yearNum, adjustedMonth, dayNum, 0, 0, 0)
  const endDate = new Date(yearNum, adjustedMonth, dayNum, 23, 59, 59)

  // Additional validation for specific months
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate()
  if (dayNum > daysInMonth) {
    throw new Error(`Fecha inválida: ${monthNum} month has only ${daysInMonth} days`)
  }

  return await appointmentModel.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ appointmentTime: 1 })
}

const getMonthlyAppointmentCounts = async (year, month) => {
  // Check if parameters exist
  if (!year || !month) {
    throw new Error('Fecha inválida: year and month are required')
  }

  // Parse and validate numeric values
  const yearNum = parseInt(year)
  const monthNum = parseInt(month)

  if (isNaN(yearNum) || isNaN(monthNum)) {
    throw new Error('Fecha inválida: year and month must be valid numbers')
  }

  // Validate year range (reasonable range for appointments)
  if (yearNum < 2000 || yearNum > 2100) {
    throw new Error('Fecha inválida: year must be between 2000 and 2100')
  }

  // Validate month range (1-12)
  if (monthNum < 1 || monthNum > 12) {
    throw new Error('Fecha inválida: month must be between 1 and 12')
  }

  // Adjust for JavaScript's 0-based months (0-11)
  const adjustedMonth = monthNum - 1
  
  const startDate = new Date(year, adjustedMonth, 1)
  const endDate = new Date(year, adjustedMonth + 1, 0)  // This will give us the last day of the month

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
