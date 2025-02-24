import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    SECRET_KEY,
    {
      expiresIn: '1h'
    }
  )
  return token
}

const setToken = (res, token) => {
  console.log('setToken')
  console.log(token)

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

const getToken = (req) => {
  console.log(req.cookies)
}

export { generateToken, setToken, getToken }
