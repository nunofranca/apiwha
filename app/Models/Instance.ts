import {DateTime} from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Protocol from "devtools-protocol";
import integer = Protocol.integer;
import User from "App/Models/User";

export default class Instance extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public instance: string

  @column()
  public name: string

  @column()
  public expiration: Date

  @column()
  public userId: number

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}
