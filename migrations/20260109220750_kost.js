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
  pgm.createType("facilities_option", [
    "WIFI",
    "AC",
    "ENSUITE_BATHROOM",
    "SHARED_BATHROOM"
  ])

  pgm.createTable('kost', {
    id: "id",
    landlord_id: { type: "id", notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    name: { type: "VARCHAR(255)", notNull: true },
    price: { type: "INTEGER", notNull: true },
    description: { type: "TEXT", notNull: true },
    location: { type: "TEXT", notNull: true },
    facilities: { type: "facilities_option[]", nullable: true  },
    total_rooms: { type: "INTEGER", notNull: true },
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
  pgm.dropTable('koat')
  pgm.dropType("facilities_option")
};
