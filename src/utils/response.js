const response = async (res, {
  code = 200,
  message = "Success",
  data = null,
  meta = null,
}) => {
  return res.status(code).json({
    status: code,
    message: message,
    data: data,
    meta: meta,
  })
}

export default response