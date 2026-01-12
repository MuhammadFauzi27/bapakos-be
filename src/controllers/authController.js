import authService from "../services/authService.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(200).send({
      message: "Login success",
      token: result.token,
    });
  } catch (e) {
    console.error("[AUTH-CONTROLLER] error login: ", e);
    next(e)
  }
}

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    await authService.register(email, password, role);

    res.status(201).send({
      message: "Register success",
    })
  } catch (e) {
    console.error("[AUTH-CONTROLLER] error register: ", e);
    next(e)
  }
}

export default {
  login,
  register,
}