import cors from 'cors'
const corsMiddleware = () => {
  return cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept'
    ],
    credentials: true,
    maxAge: 86400
  })
}
export default corsMiddleware
