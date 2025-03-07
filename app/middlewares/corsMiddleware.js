import cors from 'cors'

const corsMiddleware = () => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://127.0.0.1:5500']

  return cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cookie'
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
}

export default corsMiddleware
