import pg from "pg";
import config from "../config/config.js";

const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },

  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  console.log('Database Connect');
});

pool.on('error', () => {
  console.log('Database Error');
});

export default {
  pool
};