import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "../../Models/User";
import UserValidator from "../../Validators/UserValidator";

export default class UsersController extends UserValidator {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.v_create,
    });
    try {
      const newUser = await User.create(payload);
      response.created({
        status: true,
        data: newUser,
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

  public async login({ request, response, auth }: HttpContextContract) {
    //1

    const { email, password } = await request.validate({
      schema: this.v_sign,
    });

    //2

    try {
      const userFind = await User.query().where("email", email).first();
      if (!userFind) {
        return response.unprocessableEntity({
          errors: [
            { rule: "-", field: "email", message: `Identifiants inccorect.` },
          ],
        });
      }

      //3

      if (!(await Hash.verify(userFind.password, password))) {
        return response.unprocessableEntity({
          errors: [
            {
              rule: "-",
              field: "password",
              message: `Identifiants inccorect.`,
            },
          ],
        });
      }

      //4

      const token = await auth
        .use("api")
        .attempt(email, password, { expiresIn: "3 days" });

      return response.created({
        status: true,
        token: token,
        user: userFind,
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
