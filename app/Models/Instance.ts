import {DateTime} from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'

import User from "App/Models/User";

export default class Instance extends BaseModel {
  @column({isPrimary: true, serializeAs: null})
  public id: number

  @column()
  public instance: string

  @column()
  public name: string

  @column()
  public status: string

  @column({ serializeAs: null })
  public userId: number

  @column.dateTime({autoCreate: true, serializeAs: null})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: null})
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}
