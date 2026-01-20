import pool from "../index.js";

const create = async ({ kostId }) => {
  const query = {
    text:`INSERT INTO kost_images (kost_id, image_url) VALUES ($1, NULL) RETURNING id`,
    values: [kostId]
  }
  const result =  await pool.query(query)
  return result.rows[0].id
}

const update = async ({ id, path }) => {
  const query = {
    text:`UPDATE kost_images SET image_url = $1 WHERE id = $2`,
    values: [path, id]
  }
  const result =  await pool.query(query)
  return result.rows
}

export default {
  create,
  update
}