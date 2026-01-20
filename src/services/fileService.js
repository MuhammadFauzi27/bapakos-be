import fileRepository from "../database/repositories/fileRepository.js";
import path from "path";
import * as fs from "node:fs";

const uploadFile = async (userId, kostId, file) => {
  if  (!file) throw new Error("Gambar wajib diupload")

  const imageId = await fileRepository.create({ kostId })

  const baseDir = path.join(
    "uploads",
    "kost",
    `${userId}`,
    `${kostId}`,
  )

  fs.mkdirSync(baseDir, { recursive: true })

  const ext = path.extname(file.originalname)
  const fileName = `image-${imageId}${ext}`

  const finalPath = path.join(baseDir, fileName)

  fs.renameSync(file.path, finalPath)

  await fileRepository.update({ imageId, finalPath })

  return {
    id: imageId,
    imageUrl: finalPath,
  }
}

export default uploadFile