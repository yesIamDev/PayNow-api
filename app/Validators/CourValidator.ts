import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'

export default class CourValidator {

  public v_id_param = schema.create({
    id: schema.string([rules.uuid()]),
  });

  public v_create = schema.create({
    teacher_id: schema.string([rules.uuid()]),
    title: schema.string(),
    description: schema.string()
  })

  public messages: CustomMessages = {}
}
