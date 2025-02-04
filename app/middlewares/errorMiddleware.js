const errorMiddleware = (err, req, res, next) => {
  console.error(err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(400).json({
      success: false,
      message: `Duplicate key error: ${field} already exists.`
    })
  }

  res.status(statusCode).json({
    success: false,
    message
  })
}

export default errorMiddleware
