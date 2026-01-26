export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createType("user_role", ["LANDLORD", "TENANT"])

  pgm.createTable('users', {
    id: "id",
    email: { type: "VARCHAR(100)", notNull: true, unique: true },
    password: { type: "VARCHAR(255)", notNull: true },
    role: { type: "user_role", notNull: true, default: "TENANT" },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  })
}

export const down = (pgm) => {
  pgm.dropTable('users')
  pgm.dropType("user_role")
}

