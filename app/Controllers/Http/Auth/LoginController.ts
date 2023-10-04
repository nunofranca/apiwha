import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {

  public async formLogin({view}: HttpContextContract) {
    return await view.render('auth.login')
  }

  public async login({request, response, auth}: HttpContextContract) {
    const {username, password} = request.all()



    try {
      await auth.use('web').attempt(username, password)
      return response.redirect().toRoute('panel.dashboard')
    } catch {
      return response.badRequest('Invalid credentials')
    }

  }

}
