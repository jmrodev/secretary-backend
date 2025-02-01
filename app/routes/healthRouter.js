import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

router.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping()
    res.status(200).json({ status: 'OK', message: 'Database is connected' })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' })
  }
})
