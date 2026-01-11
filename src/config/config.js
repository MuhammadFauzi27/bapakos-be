import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.DATABASE_URL)

const config = {
  port: process.env.PORT || 3000,
  bcryptSalt: Number(process.env.SALT),
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
}

export default config