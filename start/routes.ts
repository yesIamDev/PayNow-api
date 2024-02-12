

import Route from '@ioc:Adonis/Core/Route'
import './routes/user'

Route.get('/', async () => {
  return { hello: 'world' }
})
