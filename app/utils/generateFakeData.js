import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import { createFakeUserDirect, createFakeAppointmentDirect } from './fakeDataController.js'
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

const createAdminUser = async () => {
  const adminUser = {
    userName: 'admin',
    name: 'admin',
    email: 'admin@secretary.com',
    password: 'Admin123456',  // Cumple con la validación: mínimo 8 caracteres, letra y número
    role: 'admin'
  }

  try {
    await createFakeUserDirect(adminUser)
    console.log('Usuario administrador creado exitosamente')
  } catch (error) {
    console.error('Error al crear usuario administrador:', error)
  }
}

const createFakeUser = async () => {
  const user = {
    userName: faker.internet.userName().toLowerCase(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: `${faker.internet.password(8)}Aa1`, // Asegura que cumpla con la validación
    role: 'user'
  }

  await createFakeUserDirect(user)
}

const createFakeAppointment = async () => {
  const date = faker.date.future();
  const appointment = {
    patientName: faker.person.fullName(),
    doctorName: faker.person.fullName(),
    appointmentDate: date.toISOString().split('T')[0],
    appointmentTime: `${String(getRandomInt(8, 17)).padStart(2, '0')}:${String(getRandomInt(0, 59)).padStart(2, '0')}`,
    reason: faker.lorem.sentence(),
    status: 'scheduled'
  }

  try {
    await createFakeAppointmentDirect(appointment)
    console.log('Cita creada:', appointment)
  } catch (error) {
    console.error('Error al crear cita:', error.message)
  }
}

const generateFakeData = async (numUsers = 10, numAppointments = 20) => {
  // Primero crear el usuario administrador
  await createAdminUser()

  // Luego crear usuarios regulares
  for (let i = 0; i < numUsers; i++) {
    await createFakeUser()
  }

  // Finalmente crear citas
  for (let i = 0; i < numAppointments; i++) {
    await createFakeAppointment()
  }
}

dbconnect().then(async () => {
  try {
    // Crear solo el usuario admin
    await createAdminUser()
    console.log('Datos de prueba generados exitosamente')
    process.exit(0)
  } catch (error) {
    console.error('Error al generar datos:', error)
    process.exit(1)
  }
})
