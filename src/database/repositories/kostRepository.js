import pool from "../index.js";

const findById = ({ id }) => {

}

const findByName = ({ name }) => {

}

const create = async ({
  landlordId,
  name,
  price,
  description,
  location,
  facilities,
  totalRooms
}) => {
  const query = {
    text: `
        INSERT INTO kost (landlord_id, name, price, description, location, facilities, total_rooms)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `,
    values: [landlordId, name, price, description, location, facilities ?? null, totalRooms]
  }

  const result = await pool.query(query)
  return result.rows[0]
}

const updateById = ({ id, data }) => {

}

const deleteById = ({ id }) => {

}

export default {
  findById,
  findByName,
  create,
  updateById,
  deleteById,
}