

import Route from '@ioc:Adonis/Core/Route'
import './routes/user'
import './routes/teacher'
import './routes/cours' 

Route.get('/', async () => {
  return { hello: 'world' }
})
