import pool from "../index.js";

const getById = async ({ kostId }) => {
  const query = {
    text: `SELECT * FROM kost WHERE id = $1`,
    values: [kostId]
  }
  const result = await pool.query(query)
  return result.rows[0]
}

const findByName = async ({ name }) => {

}

const create = async ({
                        landlordId,
                        name,
                        price,
                        description,
                        location,
                        facilities,
                        totalRooms,
                      }) => {
  const query = {
    text: `
        INSERT INTO kost (
            landlord_id,
            name,
            price,
            description,
            location,
            facilities,
            total_rooms,
            available_rooms,
            occupied_rooms
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
    `,
    values: [
      landlordId,
      name,
      price,
      description,
      location,
      facilities ?? null,
      totalRooms,
      totalRooms,
      0
    ]
  }

  const result = await pool.query(query)
  return result.rows[0]
}


const updatePartialById = async (client, { id, data }) => {
  const fields = []
  const values = []
  let index = 1

  for (const key in data) {
    fields.push(`${key} = $${index}`)
    values.push(data[key])
    index++
  }

  if (fields.length === 0) return null

  const query = `
      UPDATE kost
      SET
          ${fields.join(', ')},
          updated_at = now()
      WHERE id = $${index}
          RETURNING id, ${Object.keys(data).join(', ')}
  `

  const result = await client.query(query, [...values, id])
  return result.rows[0]
}


const deleteById = async ({ client, id }) => {
  const query = {
    text: `DELETE FROM kost WHERE id = $1`,
    values: [id]
  }
  const result = await client.query(query)
  return result.rows
}

const getAllByUserId = async (client, { userId }) => {
  const query = {
    text: `SELECT * FROM kost WHERE landlord_id = $1`,
    values: [userId]
  }

  const result = await client.query(query)
  return result.rows
}

const getAll = async (client) => {
  const query = {
    text: `
      SELECT 
        id,
        name,
        price,
        location,
        description,
        created_at
      FROM kost
      ORDER BY created_at DESC
    `
  }

  const result = await client.query(query)
  return result.rows
}

export default {
  getById,
  findByName,
  create,
  updatePartialById,
  deleteById,
  getAllByUserId,
  getAll,
}