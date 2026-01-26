import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/kost")
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueName + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("File harus gambar"))
  }
  cb(null, true)
}

const upload =  multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
})

export default upload