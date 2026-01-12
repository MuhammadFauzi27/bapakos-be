import config from "../config/config.js";
import * as crypto from "node:crypto";

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(config.bcryptSalt).toString("hex")
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

const verifyPassword = async (password, hashedPassword) => {
  const [salt, hash] = hashedPassword.split(':')
  if (!salt || !hash) {
    return false
  }

  const hashed = crypto.scryptSync(password, salt, 64)
  return crypto.timingSafeEqual(
    Buffer.from(hash, 64),
    hashed
  )
}

export default {
  hashPassword,
  verifyPassword,
}