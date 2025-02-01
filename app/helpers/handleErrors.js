const httpError = (res, err) => {
  console.log(err)

  if (res.headersSent) {
    return
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    res.status(400).json({
      success: false,
      message: `Duplicate key error: ${field} already exists.`
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export default httpError
