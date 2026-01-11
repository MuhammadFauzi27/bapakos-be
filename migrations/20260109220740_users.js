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
  pgm.createType("user_role", ["USER", "TENANT"])

  pgm.createTable('users', {
    id: "id",
    email: { type: "VARCHAR(100)", notNull: true, unique: true },
    password: { type: "VARCHAR(255)", notNull: true },
    role: { type: "user_role", notNull: true, default: "USER" },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('users')
  pgm.dropType("user_role")
};
