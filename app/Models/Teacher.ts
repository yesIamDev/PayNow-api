import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  beforeSave,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import generate from "../Utils/Generator";
import Cour from "./Cour";
import Paiement from "./Paiement";

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public lastname: string;

  @column()
  public sex: string;

  @column()
  public age: number;

  @column()
  public salary: number;

  @hasMany(() => Cour)
  public cours: HasMany<typeof Cour>

  @hasMany(() => Paiement)
  public paiements: HasMany<typeof Paiement>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(teacher: Teacher) {
    teacher.id = await generate.id();
  }
}
