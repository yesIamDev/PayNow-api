import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import GeneralCaseValidator from "./GeneralCaseValidator";

export default class UserValidator extends GeneralCaseValidator {
  constructor() {
    super();
  }

  public v_create = schema.create({
    username: schema.string(),
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([rules.minLength(8), rules.confirmed()])
  })

  public v_update = schema.create({
    username: schema.string(),
    email: schema.string({ trim: true }, [rules.email()]),
  })

  public messages: CustomMessages = {};
}
