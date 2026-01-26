import fileRepository from "../database/repositories/fileRepository.js";
import path from "path";
import * as fs from "node:fs";
import AppError from "../exceptions/appError.js";
import pool from "../database/index.js";

const uploadFile = async (userId, kostId, file) => {
  if (!file) throw new AppError("Gambar wajib diupload", 400)

  const baseDir = path.join("uploads", "kost", `${userId}`, `${kostId}`)
  fs.mkdirSync(baseDir, { recursive: true })

  const ext = path.extname(file.originalname)
  const fileName = `image-${Date.now()}${ext}`
  const finalPath = path.join(baseDir, fileName)

  fs.renameSync(file.path, finalPath)

  const imageUrl = finalPath.replace(/\\/g, "/")

  return await fileRepository.create({
    kostId,
    imageUrl
  })
}

const updateById = async (kostId, body) => {
  const kostImage = await fileRepository.getAllById({ kostId })
  if (!kostImage) throw new AppError('Kost tidak ditemukan', 404)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await fileRepository.updatePartialById(client, {kostId, body})

    await client.query('COMMIT')
    return result
  } catch (e) {
    await client.query('ROLLBACK')
  } finally {
    await client.release()
  }
}

export default {
  uploadFile,
  updateById,
}