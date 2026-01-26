import response from "../utils/response.js";
import bookingService from "../services/bookingService.js";

const updateBookingStatus = async (req, res, next) => {
  try {
    const kostId = req.params.kostId
    const { status } = req.body

    const result = await bookingService.updateBookingStatus(kostId, status)
    await response(res, {
      status: 200,
      message: "Berhasil update status booking",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[LANDLORD-CONTROLLER] kesalahan mengubah status: ", e)
    next(e)
  }
}

const getAllBookings = async (req, res, next) => {
  try {
    const userId = req.user.id

    const result = await bookingService.getAllByLandlordId(userId)
    await response(res, {
      status: 200,
      message: "Berhasil get all booking",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[LANDLORD-CONTROLLER] kesalahan get all booking: ", e)
    next(e)
  }
}

export default {
  updateBookingStatus,
  getAllBookings,
}