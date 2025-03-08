import cors from 'cors'

const corsMiddleware = () => {
  return cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'X-Client-Timeout',
      'Access-Control-Allow-Credentials' // Añadir este encabezado
    ],
    exposedHeaders: ['Set-Cookie']
  })
}

export default corsMiddleware
