import fileService from "../services/fileService.js";
import response from "../utils/response.js";
import kostService from "../services/kostService.js";

const uploadImage = async (req, res, next) => {
  try {
    console.log("uploads image: ", req.file);
    const userId = req.user.id;
    const kostId = req.params.kostId
    const file = req.file
    const result = await fileService.uploadFile(userId, kostId, file)
    await response(res, {
      status: 201,
      message: "Upload gambar sukses",
      data: {
        result
      }
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan uploads files: ", e)
    next(e)
  }
}

const createKost = async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log(userId);
    const body = req.body

    const result = await kostService.create(userId, body)
    await response(res, {
      status: 201,
      message: "Kost berhasil dibuat",
      data: result
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan membuat kost: ", e)
    next(e)
  }
}

const deleteKost = async (req, res, next) => {
  try {
    const kostId = req.params.kostId

    await kostService.deleteById(kostId)

    await response(res, {
      status: 200,
      message: "Kost berhasil dihapus"
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan menghapus kost: ", e)
    next(e)
  }
}

const getKostById = async (req, res, next) => {
  try {
    const kostId = req.params.kostId
    const result = await kostService.getById(kostId)
    console.log(result)
    await response(res, {
      status: 200,
      message: "Kost berhasil ditemukan",
      data: result
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan get satu kost: ", e)
    next(e)
  }
}

const updateKostById = async (req, res, next) => {
  try {
    const kostId = req.params.kostId
    const body = req.body

    const result = await kostService.updateById(kostId, body)

    await response(res, {
      status: 200,
      message: "Kost berhasil diupdate",
      data: result
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan update kost: ", e)
    next(e)
  }
}

const getAllKosts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await kostService.getAllById(userId)

    await response(res, {
      status: 200,
      message: "Kosst berhasil ditemukan",
      data: result
    })
  } catch (e) {
    console.error("[KOST-CONTROLLER] kesalahan get all kost: ", e)
    next(e)
  }
}

export default {
  uploadImage,
  createKost,
  deleteKost,
  getKostById,
  updateKostById,
  getAllKosts,
}