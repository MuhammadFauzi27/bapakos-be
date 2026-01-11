import pool from "../index.js";

const findByEmail = async (email) => {
  const query = {
    text: `SELECT email, password FROM users WHERE email=$1`,
    values: [email]
  }

  const result = await pool.query(query)
  return result.rows
}

const create = async (email, password, roles) => {
  const query = {
    text: `INSERT INTO users (email, password, roles) VALUES ($1, $2, $3)`,
    values: [email, password, roles]
  }
  await pool.query(query)
}

export default {
  findByEmail,
  create,
}