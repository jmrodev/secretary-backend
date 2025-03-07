import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {

    date:
    {
      type: Date,
      required: true
    },
    appointmentTime:
    {
      type: String,
      required: true
    },
    patientName:
    {
      type: String,
      required: true
    },
    reason:
    {
      type: String,
      required: true
    },
    notes:
    {
      type: String
    },
    patient: {
      type: String,
      required: true
    },
    doctor: {
      type: String,
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
