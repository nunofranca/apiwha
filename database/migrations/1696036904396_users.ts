import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email').unique()
      table.string('username').unique()
      table.string('password')
      table.string('phone').unique()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true, precision: 6 })
      table.timestamp('updated_at', { useTz: true, precision: 6 })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
