import pool from '../index.js'

const create = async ({ data }) => {
  const { kostId, tenantId, landlordId, status = 'PENDING' } = data

  const query = `INSERT INTO bookings (kost_id, tenant_id, landlord_id, status) VALUES ($1, $2, $3, $4) RETURNING *`

  const values = [kostId, tenantId, landlordId, status]
  const result = await pool.query(query, values)

  return result.rows[0]
}

const getAllByTenantId = async ({ tenantId }) => {
  const query = `SELECT * FROM bookings WHERE tenant_id = $1 ORDER BY created_at DESC`

  const result = await pool.query(query, [tenantId])
  return result.rows
}

const getAllByLandlordId = async ({ landlordId }) => {
  const query = `
      SELECT
          b.*,
          k.name AS kost_name,
          k.location AS kost_location,
          k.price AS kost_price
      FROM bookings b
               JOIN kost k ON b.kost_id = k.id
      WHERE b.landlord_id = $1
      ORDER BY b.created_at DESC
  `

  const result = await pool.query(query, [landlordId])
  return result.rows
}

const updateById = async ({ id, status }) => {
  const query = `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`

  const values = [status, id]
  const result = await pool.query(query, values)

  return result.rows[0]
}

const getAllByKostId = async ({ kost_id }) => {
  const query = `SELECT * FROM bookings WHERE kost_id = $1 ORDER BY created_at DESC`

  const result = await pool.query(query, [kost_id])
  return result.rows
}

const getById = async ({ id }) => {
  const query = {
    text: `SELECT * FROM bookings WHERE id = $1`,
    values: [id],
  }

  const result = await pool.query(query)
  return result.rows[0]
}

export default {
  getAllByTenantId,
  getAllByLandlordId,
  getAllByKostId,
  updateById,
  create,
  getById,
}