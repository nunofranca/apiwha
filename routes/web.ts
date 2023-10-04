import Route from '@ioc:Adonis/Core/Route'


Route.get('/login', 'Auth/AuthController.formLogin').as('login')
Route.post('/login', 'Auth/AuthController.login').as('login.store')

Route.get('/', async function ({view}) {
  return await view.render('welcome')
}).as('home')


Route.group(() => {
  Route.get('/dashboard', async ({view}) => {
    return await view.render('panel/dashboard/index')
  }).as('panel.dashboard')


  Route.get('instancias', 'Panel/InstancesController.index').as('instances.index');
  Route.post('instancias', 'Panel/InstancesController.store').as('instance.store');
  Route.get('instancias/:id', 'Panel/InstancesController.show').as('instance.show');
}).middleware('auth').prefix('/painel')




