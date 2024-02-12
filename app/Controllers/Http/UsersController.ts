import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserService from "App/Services/User.service";
import UserValidator from "App/Validators/UserValidator";
import Logger from "@ioc:Adonis/Core/Logger";
import { inject } from "@adonisjs/fold";

@inject()
export default class UsersController extends UserValidator {
  constructor(private readonly user: UserService) {
    super();
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.v_create,
    });
    try {
      const newUser = await this.user.registre(payload);
      response.created({ status: true, data: newUser });
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
    const payload = request.validate({
      schema: this.v_sign,
    });

    try {
      const email = (await payload).email;
      const password = (await payload).password;

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
      });

      return response.created({
        status: true,
        token,
        data: payload,
      });
    } catch (error) {
      Logger.error(error);
      return response.expectationFailed({
        status: false,
        message: error.message,
      });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use("api").revoke();
    return {
      revoked: true,
      logout: "successfuly",
    };
  }
}
