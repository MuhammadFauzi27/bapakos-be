import bookingRepository from "../database/repositories/bookingRepository.js";
import AppError from "../exceptions/appError.js";
import userRepository from "../database/repositories/userRepository.js";
import kostRepository from "../database/repositories/kostRepository.js";

const getAllByLandlordId = async (landlordId) => {
  const user = await userRepository.getById({ userId: landlordId })
  if (!user) {
    throw new AppError(`Pengguna ${landlordId} tidak ditemukan`, 404)
  }

  return await bookingRepository.getAllByLandlordId({landlordId})
}

const getAllByTenantId = async (tenantId) => {
  const user = await userRepository.getById({ userId: tenantId })
  if (!user) {
    throw new AppError(`Pengguna ${tenantId} tidak ditemukan`, 404)
  }

  return await bookingRepository.getAllByTenantId({tenantId})
}

const createBooking = async (tenantId, kost) => {
  const user = await userRepository.getById({ userId: tenantId })
  if (!user) {
    throw new AppError(`Pengguna ${tenantId} tidak ditemukan`, 404)
  }

  const kostId = kost.id
  const query = await kostRepository.getById({ kostId })
  if (!query) {
    throw new AppError(`Kost tidak ditemukan`, 404)
  }
  const data = {
    kostId: query.id,
    tenantId: user.id,
    landlordId: query.landlord_id,
  }

  return await bookingRepository.create({data})
}

const updateBookingStatus = async (id, status) => {
  const booking = await bookingRepository.getById({id})
  if (!booking) {
    throw new AppError("History booking tidak ditemukan", 404);
  }

  return await bookingRepository.updateById({id, status});
}

export default {
  getAllByLandlordId,
  getAllByTenantId,
  updateBookingStatus,
  createBooking,
}