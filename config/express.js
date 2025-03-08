import express from 'express'
import index from '../app/routes/index.js'
import securityMiddleware from '../app/middlewares/securityMiddleware.js'
import logMiddleware from '../app/middlewares/logMiddleware.js'

const expressConfig = (app) => {
  // Middlewares básicos
  app.use(logMiddleware)

  // Middlewares de seguridad
  const securityMiddlewares = securityMiddleware()
  securityMiddlewares.forEach((middleware) => app.use(middleware))

  // Rutas de la API
  app.use('/api', index)
}

export default expressConfig
