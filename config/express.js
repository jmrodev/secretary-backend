import express from 'express'
import cookieParser from 'cookie-parser'
import index from '../app/routes/index.js'
import corsMiddleware from '../app/middlewares/corsMiddleware.js'
import securityMiddleware from '../app/middlewares/securityMiddleware.js'
import logMiddleware from '../app/middlewares/logMiddleware.js'
import errorMiddleware from '../app/middlewares/errorMiddleware.js'

const expressConfig = (app) => {
  // Enable CORS first
  app.use(corsMiddleware())

  // Cookie parser before body parsers
  app.use(cookieParser())

  // Parse JSON and URL-encoded bodies
  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ extended: true, limit: '10kb' }))

  // Enhanced logging
  app.use(logMiddleware)

  // Security middlewares
  const securityMiddlewares = securityMiddleware()
  securityMiddlewares.forEach((middleware) => app.use(middleware))

  // API Routes
  app.use('/api', index)

  // 404 handler for undefined routes
  app.use((req, res) => {
    res.status(404).json({ 
      success: false, 
      message: `Path ${req.originalUrl} not found`
    })
  })

  // Error handling last
  app.use(errorMiddleware)
}

export default expressConfig
