import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Paiement from "../../Models/Paiement";
import Teacher from "../../Models/Teacher";
import PaiementValidator from "../../Validators/PaiementValidator";

export default class PaiementsController extends PaiementValidator {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Paiement.query().orderBy("created_at", "desc");
      return response.json({
        status: true,
        data: data,
      });
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      return response.expectationFailed({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    //1
    const payload = await request.validate({
      schema: this.v_create,
      data: {
        teacher_id: request.param("teacherId"),
        description: request.input("description"),
        amount: request.input("amount"),
      },
    });

    //2

    const teacherFind = await Teacher.query()
      .where("id", payload.teacher_id)
      .first();
      
    if (teacherFind) {
      if (payload.amount !== teacherFind.salary) {
        return response.json({
          status: false,
          message:
            "Le montant du paiement doit correspondre au salaire fixer initialement pour l'enseigant !",
        });
      }
    } else {
      return response.json({
        status: false,
        message: "Aucun enseignant retrouver pour cet identifiant!",
      });
    }

    //3

    try {
      const newPaiement = await Paiement.create(payload);
      response.created({
        status: true,
        data: newPaiement,
      });
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      return response.expectationFailed({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }
}
