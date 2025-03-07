import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role
    },
    SECRET_KEY,
    {
      expiresIn: TOKEN_EXPIRATION
    }
  )
  return token
}

const setToken = (res, token) => {
  res.cookie('token',
    token,
    {
      httpOnly: true,
      maxAge: TOKEN_EXPIRATION,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    }
  )
}

export { generateToken, setToken }
