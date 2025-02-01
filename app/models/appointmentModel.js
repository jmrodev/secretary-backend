import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: String,
      required: true
    },
    doctor: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
)

const AppointmentModel = mongoose.model('Appointments', appointmentSchema)

export default AppointmentModel
