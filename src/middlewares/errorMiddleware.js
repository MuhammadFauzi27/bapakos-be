import appError from "../exceptions/appError.js"

const errorMiddleware = (err, req, res, next) => {
  console.error(`[errorMiddleware] - Error: ${err}`)

  if (!err) {
    next()
  }

  if (err instanceof appError) {
    res.status(err?.status || 500).json({
      success: false,
      code: err.status,
      message: err.track,
    }).end()
  } else {
    res.status(500).json({
      success: false,
      code: 500,
      message: "Terjadi kesalahan internal server",
    }).end()
  }
}

export default errorMiddleware