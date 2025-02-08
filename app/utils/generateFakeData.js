import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import { createFakeUserDirect, createFakeAppointmentDirect } from './fakeDataController.js'
import { createItem as createUser } from '../controllers/usersController.js'
import { createItem as createAppointment } from '../controllers/appointmentController.js'

dotenv.config()

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
    })
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const createFakeUser = async () => {
  const user = {
    userName: faker.internet.username(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'user'
  }

  await createFakeUserDirect(user)
}

const createFakeAppointment = async () => {
  const appointment = {
    patient: faker.person.fullName(),
    doctor: faker.person.fullName(),
    date: faker.date.future().toISOString(),
    time: `${getRandomInt(0, 23)}:${getRandomInt(0, 59)}`,
    status: 'scheduled'
  }

  await createFakeAppointmentDirect(appointment)
  console.log('Fake appointment created:', appointment)
}

const generateFakeData = async (numUsers = 1000, numAppointments = 1000) => {
  for (let i = 0; i < numUsers; i++) {
    await createFakeUser()
  }
  for (let i = 0; i < numAppointments; i++) {
    await createFakeAppointment()
  }
}

dbconnect().then(() => {
  generateFakeData()
    .then(() => {
      console.log('Fake data generated')
      process.exit()
    })
    .catch((error) => {
      console.error('Error generating fake data:', error)
      process.exit(1)
    })
})
