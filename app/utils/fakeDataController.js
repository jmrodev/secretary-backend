import { createUser } from '../repositories/usersRepository.js'
import { createAppointment } from '../repositories/appointmentRepository.js'

export const createFakeUserDirect = async (userData) => {
  try {
    const user = await createUser(userData)
    console.log('Created user:', user.userName)
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const createFakeAppointmentDirect = async (appointmentData) => {
  try {
    const appointment = await createAppointment(appointmentData)
    console.log('Created appointment:', appointment)
    return appointment
  } catch (error) {
    console.error('Error creating appointment:', error)
    throw error
  }
}
