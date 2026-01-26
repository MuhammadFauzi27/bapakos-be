import authRepository from "../database/repositories/userRepository.js"
import AppError from "../exceptions/appError.js"
import passwordUtils from "../utils/password.js"
import regexExp from "../utils/regexExp.js"
import jwt from "../utils/jwt.js"

const login = async (email, password) => {
  if (!regexExp.isValidEmail(email)) throw new AppError("Alamat email tidak sah", 400)

  const result = await authRepository.findByEmail({ email });
  if (!result) throw new AppError("User tidak ditemukan", 404)

  const samePassword = await passwordUtils.verifyPassword(result.password, password)
  if (samePassword) throw new AppError("Password atau Email salah", 400)

  console.log(result)
  console.log(result.role)

  const payload = {
    id: result.id,
    role: result.role,
  }

  return {
    token: jwt.signToken(payload),
    role: result.role,
  }
}

const register = async (email, password, role) => {
  if (!regexExp.isValidEmail(email)) throw new AppError("Alamat email tidak sah", 400)

  const hashedPassword = await passwordUtils.hashPassword(password)
  await authRepository.create({ email, password: hashedPassword, role })
}

export default {
  login,
  register,
}