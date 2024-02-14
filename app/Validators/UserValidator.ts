import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";


export default class UserValidator {

  public v_create = schema.create({
    username: schema.string(),
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([rules.minLength(8), rules.confirmed()])
  })

  public v_sign = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string([rules.minLength(8)]),
  });

  public v_update = schema.create({
    username: schema.string(),
    email: schema.string({ trim: true }, [rules.email()]),
  })

  public v_change_psswd = schema.create({
    oldPassword: schema.string(),
    password: schema.string([rules.minLength(4), rules.confirmed()]),
  });

  public messages: CustomMessages = {};
}
