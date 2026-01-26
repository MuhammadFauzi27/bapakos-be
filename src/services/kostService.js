import userRepository from "../database/repositories/userRepository.js";
import AppError from "../exceptions/appError.js";
import kostRepository from "../database/repositories/kostRepository.js";
import pool from "../database/index.js";
import fileRepository from "../database/repositories/fileRepository.js";
import { promises as fs } from 'fs'

const create = async (userId, body) => {
  const user = await userRepository.getById({ userId })
  if (!user) throw new AppError('Pengguna tidak ditemukan', 404)
  if (user.role !== 'LANDLORD') {
    throw new AppError('Pengguna bukan seorang landlord', 403)
  }

  const {
    name,
    price,
    description,
    location,
    facilities,
    totalRooms
  } = body

  const normalizedFacilities =
    facilities
      ? Array.isArray(facilities)
        ? facilities
        : [facilities]
      : null

  return await kostRepository.create({
    landlordId: userId,
    name,
    price,
    description,
    location,
    facilities: normalizedFacilities,
    totalRooms
  })
}

const deleteById = async (kostId) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const kostImages = await fileRepository.getAllByKostId({kostId})

    // Hapus file gambar jika ada
    for (const img of kostImages) {
      try {
        await fs.unlink(img.image_url) // ini sekarang promise
      } catch (err) {
        if (err.code !== 'ENOENT') throw err // ignore file not found
      }
    }

    // Hapus kost
    const result = await kostRepository.deleteById({client, id: kostId})
    if (!result || result.rowCount === 0) throw new AppError('Kost tidak ditemukan', 404)

    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    await client.release()
  }
}

const getById = async (kostId) => {
  const kost = await kostRepository.getById({ kostId })
  if (!kost) throw new AppError('Kost tidak ditemukan', 404)

  const image = await fileRepository.getAllByKostId({ kostId })
  console.log(kost)
  return {
    id: kost.id,
    landlordId: kost.landlord_id,
    name: kost.name,
    price: kost.price,
    description: kost.description,
    location: kost.location,
    facilities: kost.facilities,
    totalRooms: kost.total_rooms,
    images: image
  }
}

const updateById = async (kostId, body) => {
  const kost = await kostRepository.getById({ kostId })
  if (!kost) throw new AppError('Kost tidak ditemukan', 404)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    let kostResult = null
    let imageResult = null

    // update kost (selain image)
    const { image_id, image_url, ...kostData } = body
    if (Object.keys(kostData).length > 0) {
      kostResult = await kostRepository.updatePartialById(client, {
        id: kostId,
        data: kostData
      })
    }

    // update image (kalau ada)
    if (image_id && image_url) {
      imageResult = await fileRepository.updatePartialById(client, {
        id: image_id,
        data: { image_url }
      })
    }

    await client.query('COMMIT')

    return {
      ...(kostResult && { kost: kostResult }),
      ...(imageResult && { image: imageResult })
    }

  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    await client.release()
  }
}

const getAllById = async (userId) => {
  const user = await userRepository.getById({ userId })
  if (!user) {
    throw new AppError('User tidak ditemukan atau bukan landlord', 404)
  }

  const client = await pool.connect()

  try {
    const kosts = await kostRepository.getAllByUserId(client, { userId })

    if (!kosts.length) {
      return []
    }

    const kostIds = kosts.map(k => k.id)

    const imagesGrouped =
      await fileRepository.getAllGroupedByKostIds(client, { kostIds })

    const imageMap = imagesGrouped.reduce((acc, row) => {
      acc[row.kost_id] = row.images
      return acc
    }, {})

    return kosts.map(kost => ({
      ...kost,
      images: imageMap[kost.id] ?? []
    }))
  } catch (e) {
    throw e
  } finally {
    client.release()
  }
}

const getAllKost = async () => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const kosts = await kostRepository.getAll(client)
    if (!kosts.length) {
      return []
    }

    const kostIds = kosts.map(k => k.id)

    const imagesGrouped =
      await fileRepository.getAllGroupedByKostIds(
        client,
        { kostIds }
      )

    const imageMap = {}
    for (const row of imagesGrouped) {
      imageMap[row.kost_id] = row.images
    }

    const result = kosts.map(kost => ({
      ...kost,
      images: imageMap[kost.id] || []
    }))

    await client.query('COMMIT')
    return result
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

export default {
  create,
  deleteById,
  getById,
  updateById,
  getAllById,
  getAllKost
}