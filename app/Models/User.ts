import { DateTime } from "luxon";
import generate from "../Utils/Generator";
import { column, beforeSave, BaseModel } from "@ioc:Adonis/Lucid/Orm";
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    user.id = await generate.id();
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
