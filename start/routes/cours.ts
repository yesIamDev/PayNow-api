import Route from "@ioc:Adonis/Core/Route";


Route.group(() => {
  Route.group(() => {
    Route.get('cours', 'CoursController.index')
    Route.post('cours/:teacherId', 'CoursController.store')
    Route.delete('cours/:id','CoursController.destroy')
  }).prefix('api/v1')
})