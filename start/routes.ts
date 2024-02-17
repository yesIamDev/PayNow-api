

import Route from '@ioc:Adonis/Core/Route'
import './routes/user'
import './routes/teacher'

Route.get('/', async () => {
  return { hello: 'world' }
})
