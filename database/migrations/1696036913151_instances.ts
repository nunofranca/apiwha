import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'instances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.string('instance')
      table.string('name')
      table.string('status').defaultTo('notLogged')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true, precision: 6 })
      table.timestamp('updated_at', { useTz: true, precision: 6 })
    })
  }

  public async down() {
    this.schema.dropTable('instances')
  }
}
