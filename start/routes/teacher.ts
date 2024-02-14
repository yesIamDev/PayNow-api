import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get("/teachers", "TeachersController.index");
    Route.post("/teachers", "TeachersController.store");
    Route.put("/teachers/:id", "TeachersController.update");
    Route.delete("/teachers/:id", "TeachersController.destroy");
    
  }).middleware('auth:user');
});
