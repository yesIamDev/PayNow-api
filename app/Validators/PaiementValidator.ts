import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class PaiementValidator {

  public v_create = schema.create({
    teacher_id: schema.string([rules.uuid()]),
    description: schema.string(),
    amount: schema.number()
  })

  public messages: CustomMessages = {}
}
