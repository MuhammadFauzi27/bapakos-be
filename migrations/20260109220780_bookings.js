/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const up = (pgm) => {
  pgm.createType("booking_status", [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED"
  ])

  pgm.createTable('rooms', {
    id: "id",
    room_id: { type: "id", notNull: true, references: 'rooms(id)', onDelete: 'CASCADE' },
    tenant_id: { type: "id", notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    kost_price: { type: "INTEGER", notNull: true, references: 'kost(price)', onDelete: 'CASCADE' },
    status: { type: "room_status", notNull: true, default: "AVAILABLE" },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('bookings')
  pgm.dropType("booking_status")
};
