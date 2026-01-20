import uploadFile from "../services/fileService.js";
import response from "../utils/response.js";
import kostService from "../services/kostService.js";

const uploadImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const kostId = req.params.kostId
    const file = req.files
    const result = await uploadFile(userId, kostId, file)
    await response(res, {
      status: 201,
      message: "Upload gambar sukses",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan upload files: ", e)
    next(e)
  }
}

const createKost = async (req, res, next) => {
  try {
    const userId = req.user.id
    const body = req.body

    const result = await kostService.create(userId, body)
    await response(res, {
      status: 201,
      message: "Kost berhasil dibuat",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan membuat kost: ", e)
    next(e)
  }
}

export default {
  uploadImage,
  createKost,
}