export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createType("facilities_option", [
    "WIFI",
    "AC",
    "ENSUITE_BATHROOM",
    "SHARED_BATHROOM"
  ])

  pgm.createTable('kost', {
    id: { type: 'serial', primaryKey: true },
    landlord_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    name: { type: 'varchar(255)', notNull: true },
    price: { type: 'integer', notNull: true },
    description: { type: 'text', notNull: true },
    location: { type: 'text', notNull: true },
    facilities: { type: 'facilities_option[]' },
    total_rooms: { type: 'integer', notNull: true },
    available_rooms: { type: 'integer', notNull: true },
    occupied_rooms: { type: 'integer', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  })


  pgm.addConstraint('kost', 'room_consistency_check', {
    check: 'total_rooms = available_rooms + occupied_rooms'
  })

  pgm.addConstraint('kost', 'price_positive_check', {
    check: 'price > 0'
  })
}

export const down = (pgm) => {
  pgm.dropTable('kost')
  pgm.dropType("facilities_option")
}

