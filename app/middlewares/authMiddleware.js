import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
  const token = req.cookies.token

  console.log('Token received:', token) // Debugging line

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded

    next()
  } catch (error) {
    console.error('Token verification error:', error) // Debugging line
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default validateToken
