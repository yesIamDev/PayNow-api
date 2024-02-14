import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("users", "UsersController.store");
    Route.post("users/signin", "UsersController.login");
  }).prefix("/api/v1/");
});
