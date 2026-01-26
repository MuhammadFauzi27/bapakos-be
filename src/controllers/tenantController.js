import bookingService from "../services/bookingService.js";
import response from "../utils/response.js";
import kostService from "../services/kostService.js";

const getAllHistoryTransaction = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await bookingService.getAllByTenantId(userId)

    await response(res, {
      status: 200,
      message: "Berhasil get all kost",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[TENANT-CONTROLLER] kesalahan membuat booking: ", e)
    next(e)
  }
}

const getById = async (req, res, next) => {

}

const createBooking = async (req, res, next) => {
  try {
    const userId = req.user.id
    const data = req.body
    const result = await bookingService.createBooking(userId, data)

    await response(res, {
      status: 201,
      message: "Berhasil booking kost",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[TENANT-CONTROLLER] kesalahan membuat booking: ", e)
    next(e)
  }
}

const getAll = async (req, res, next) => {
  try {
    const result = await kostService.getAllKost()

    await response(res, {
      status: 200,
      message: "Berhasil get all kost",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[TENANT-CONTROLLER] kesalahan get kost: ", e)
    next(e)
  }
}

export default {
  createBooking,
  getAllHistoryTransaction,
  getById,
  getAll,
}