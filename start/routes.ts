

import Route from '@ioc:Adonis/Core/Route'
import './routes/user'
import './routes/teacher'
import './routes/cours' 
import './routes/paiement'

Route.get('/', async () => {
  return { hello: 'world' }
})
