import authService from "../services/authService.js";
import response from "../utils/response.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)

    await response(res, {
      message: "Login sukses",
      data: {
        token: result.token,
        role: result.role
      }
    })
  } catch (e) {
    console.error("[AUTH-CONTROLLER] error login: ", e)
    next(e)
  }
}

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body
    await authService.register(email, password, role)

    await response(res, {
      code: 201,
      message: "Register sukses"
    })
  } catch (e) {
    console.error("[AUTH-CONTROLLER] error register: ", e)
    next(e)
  }
}

export default {
  login,
  register,
}