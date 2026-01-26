import pool from "../index.js";

const create = async ({ kostId, imageUrl }) => {
  const query = {
    text: `
        INSERT INTO kost_images (kost_id, image_url)
        VALUES ($1, $2)
            RETURNING *
    `,
    values: [kostId, imageUrl]
  }

  const result = await pool.query(query)
  return result.rows[0]
}

const update = async ({ id, path }) => {
  const query = {
    text:`UPDATE kost_images SET image_url = $1 WHERE id = $2`,
    values: [path, id]
  }
  const result =  await pool.query(query)
  return result.rows[0]
}

const getAllByKostId = async ({ kostId }) => {
  const query = {
    text:`SELECT * FROM kost_images WHERE kost_id = $1`,
    values: [kostId]
  }
  const result =  await pool.query(query)
  return result.rows
}

const deleteById = async ({ client, kostId }) => {
  const query = {
    text: `DELETE FROM kost_images WHERE kost_id = $1`,
    values: [kostId]
  }
  const result =  await client.query(query)
  return result.rows
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
      UPDATE kost_images
      SET
          ${fields.join(', ')},
          updated_at = now()
      WHERE id = $${index}
          RETURNING id, ${Object.keys(data).join(', ')}
  `

  const result = await client.query(query, [...values, id])
  return result.rows[0]
}

const getAllGroupedByKostIds = async (client, { kostIds }) => {
  if (!kostIds.length) return []

  const query = {
    text: `SELECT kost_id, json_agg(json_build_object(
            'id', id,
            'image_url', image_url,
            'created_at', created_at
          )
        ) AS images
      FROM kost_images
      WHERE kost_id = ANY($1)
      GROUP BY kost_id
    `,
    values: [kostIds]
  }

  const result = await client.query(query)
  return result.rows
}


export default {
  create,
  update,
  getAllByKostId,
  deleteById,
  updatePartialById,
  getAllGroupedByKostIds
}