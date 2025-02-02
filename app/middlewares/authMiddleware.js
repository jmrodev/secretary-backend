// middlewares/auth.js
import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
  console.log(res.cookies)

  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default validateToken
