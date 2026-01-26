export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createType("booking_status", [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED"
  ])

  pgm.createTable('bookings', {
    id: "id",
    kost_id: {
      type: "id",
      notNull: true,
      references: 'kost(id)',
      onDelete: 'CASCADE'
    },
    landlord_id: {
      type: "id",
      notNull: true,
      references: 'users(id)',
      onDelete: 'RESTRICT'
    },
    tenant_id: {
      type: "id",
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
    status: {
      type: "booking_status",
      notNull: true,
      default: "PENDING"
    },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  })

  pgm.addIndex('bookings', ['tenant_id'])
  pgm.addIndex('bookings', ['kost_id'])
}

export const down = (pgm) => {
  pgm.dropTable('bookings')
  pgm.dropType("booking_status")
}

