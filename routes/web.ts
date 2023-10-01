import Route from '@ioc:Adonis/Core/Route'
import {auth} from "App/Controllers/Http/Venom/AuthController";
import {SendText} from "App/Controllers/Http/Venom/MessagesController"

Route.get('/login', 'Auth/LoginController.formLogin').as('login')
Route.post('/login', 'Auth/LoginController.login').as('login.store')







Route.group(() => {
  Route.get('/dashboard', async ({view})=>{
    return  await view.render('panel/dashboard/index')
  })


  Route.get('instancias', 'Panel/InstancesController.index');
  Route.post('instancias', 'Panel/InstancesController.store').as('instance.store');
}).middleware('auth').prefix('/painel')





Route.post('/auth', auth)


Route.post('/send-text', SendText)
