import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";

export default class TeacherValidator {
  public v_create = schema.create({
    name: schema.string(),
    lastname: schema.string(),
    sex: schema.string(),
    age: schema.number(),
    salary: schema.number(),
  });

  public v_id_param = schema.create({
    id: schema.string([rules.uuid()]),
  });

  public v_update = schema.create({
    name: schema.string.optional(),
    lastname: schema.string.optional(),
    sex: schema.string.optional(),
    age: schema.number.optional(),
    salary: schema.number.optional()

  });

  public messages: CustomMessages = {};
}
