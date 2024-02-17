import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get('paiements','PaiementController.index'),
    Route.post('paiements/:teacherId','PaiementController.store')
  }).prefix('api/v1')
})