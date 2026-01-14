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
  pgm.createType("room_status", [
    "OCCUPIED",
    "AVAILABLE"
  ])

  pgm.createTable('rooms', {
    id: "id",
    kost_id: { type: "id", notNull: true, references: 'kost(id)', onDelete: 'CASCADE' },
    room_number: { type: "VARCHAR(50)", notNull: true },
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
  pgm.dropTable('rooms')
  pgm.dropType("rooms_status")
};
