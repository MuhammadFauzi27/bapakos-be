import pool from "../index.js";

const findByEmail = async ({ email }) => {
  const query = {
    text: `SELECT * FROM users WHERE email=$1`,
    values: [email]
  }

  const result = await pool.query(query)
  return result.rows[0]
}

const create = async ({ email, password, role }) => {
  const query = {
    text: `INSERT INTO users (email, password, role) VALUES ($1, $2, $3)`,
    values: [email, password, role]
  }
  await pool.query(query)
}

const getById = async ({ userId }) => {
  const query = {
    text: `SELECT * FROM users WHERE id=$1`,
    values: [userId]
  }
  const result = await pool.query(query)
  return result.rows[0]
}

export default {
  findByEmail,
  create,
  getById,
}