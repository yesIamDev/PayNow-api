import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get('paiements','PaiementsController.index'),
    Route.post('paiements/:teacherId','PaiementsController.store')
  }).prefix('api/v1')
})