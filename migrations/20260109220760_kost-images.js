export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createTable('kost_images', {
    id: { type: 'serial', primaryKey: true },
    kost_id: {
      type: 'integer',
      notNull: true,
      references: 'kost(id)',
      onDelete: 'CASCADE',
    },
    image_url: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  })

  pgm.addIndex('kost_images', ['kost_id'])
}

export const down = (pgm) => {
  pgm.dropTable('kost_images')
}
