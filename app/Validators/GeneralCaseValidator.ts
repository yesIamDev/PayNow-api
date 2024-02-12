import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";

export default class GeneralCaseValidator {

  /* A validation for the login route. */
  public v_sign = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string(),
  });

  /* A validation for the change password route */

  public v_change_psswd = schema.create({
    oldPassword: schema.string(),
    password: schema.string([rules.minLength(4), rules.confirmed()]),
  });

  public messages: CustomMessages = {};
}
