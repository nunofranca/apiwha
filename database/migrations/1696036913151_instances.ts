import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'instances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
        .references('users.id')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.string('instance')
      table.string('name')
      table.date('expiration')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable('instances')
  }
}
