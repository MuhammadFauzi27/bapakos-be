import userRepository from "../database/repositories/userRepository.js";
import AppError from "../exceptions/appError.js";
import kostRepository from "../database/repositories/kostRepository.js";

const create = async (userId, body) => {
  const user = await userRepository.getById({ userId })
  if (!user) throw new AppError('Pengguna tidak ditemukan', 404)
  if (user.role !== "LANDLORD") throw new AppError('Pengguna bukan seorang landlord', 400)

  const [name, price, description, location, facilities, totalRooms] = body

  return await kostRepository.create({
    userId,
    name,
    price,
    description,
    location,
    facilities,
    totalRooms,
  })
}

export default {
  create,
}