import express from 'express'
import index from '../app/routes/index.js'
import corsMiddleware from '../app/middlewares/corsMiddleware.js'
import securityMiddleware from '../app/middlewares/securityMiddleware.js'
import logMiddleware from '../app/middlewares/logMiddleware.js'

const expressConfig = (app) => {
  app
    .use(express.json({ limit: '10kb' }))
    .use(express.urlencoded({ extended: true, limit: '10kb' }))

  app.use(corsMiddleware())

  app.use(logMiddleware)

  const securityMiddlewares = securityMiddleware()
  securityMiddlewares.forEach((middleware) => app.use(middleware))

  app.use('/api', index)
}

export default expressConfig
