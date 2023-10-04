import Route from '@ioc:Adonis/Core/Route'


Route.post('/api/register', 'Api/Auth/AuthController.register')


Route.post('/api/instance-up', 'Api/Instance/InstancesController.create').middleware('auth:api')


Route.post('/api/send-text', 'Api/Instance/MessagesController.sendText').middleware('auth:api')
Route.post('/api/send-file', 'Api/Instance/MessagesController.sendFile').middleware('auth:api')
