import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import TeacherValidator from "../../Validators/TeacherValidator";
import Teacher from "../../Models/Teacher";

export default class TeachersController extends TeacherValidator {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Teacher.query().orderBy("created_at", "desc");
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

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.v_create,
    });

    try {
      const newTeacher = await Teacher.create(payload);
      response.created({
        status: true,
        data: newTeacher,
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

  public async update({ request, response }: HttpContextContract) {
    //1
    const { id } = await request.validate({
      schema: this.v_id_param,
      data: { id: request.param("id") },
    });

    const payload = request.validate({ schema: this.v_update });

    //2

    try {
      const teacherFind = await Teacher.query().where("id", id);
      if (!teacherFind) {
        return response.notFound({
          status: false,
          message: "teacher not found",
        });
      }

      const data = await Teacher.query().where("id", id).update(payload);
      response.created({ status: true, data });
    } catch (error) {
      Logger.error(error.message);
      return response.expectationFailed({
        status: false,
        message: error.message,
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await Teacher.query().where("id", params.id).delete();
      return response.json({
        message: "teacher deleted succesfully",
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
