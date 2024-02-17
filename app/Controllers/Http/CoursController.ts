import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cour from "../../Models/Cour";
import Teacher from "../../Models/Teacher";
import Logger from "@ioc:Adonis/Core/Logger";
import CourValidator from "../../Validators/CourValidator";

export default class CoursController extends CourValidator {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Cour.query().orderBy("created_at", "desc");
      return response.json({ data: data });
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      return response.expectationFailed({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }

  public async store({ response, request }: HttpContextContract) {
    //1
    const payload = await request.validate({
      schema: this.v_create,
      data: {
        id: request.param("id"),
        title: request.input("title"),
        description: request.input("description"),
      },
    });

    //2
    const teacherFind = await Teacher.query().where("id", payload.id);

    if (!teacherFind)
      return response.json({
        status: false,
        message:
          "Enseignant Introuvable pour cet identifiant passe en parametre ",
      });

    try {
      const newCours = await Cour.create(payload);
      response.created({
        status: true,
        data: newCours,
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

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await Cour.query().where("id", params.id).delete();
      return response.json({
        message: "Cours deleted succesfully",
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
