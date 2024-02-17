import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import generate from "../Utils/Generator";

export default class Paiement extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public teacher_id: string

  @column()
  public description: string

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(paiement: Paiement) {
    paiement.id = await generate.id();
  }
}
