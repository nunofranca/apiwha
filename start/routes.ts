import Route from '@ioc:Adonis/Core/Route'

import {auth} from "App/Controllers/Http/Venom/AuthController";

Route.get('/', function ({view}) {
  return view.render('welcome')
})

Route.post('/sendText', 'MessagesController.sendText')
Route.post('/auth', auth)

Route.get('/dashboard', 'Painel/DashboardController.index')
