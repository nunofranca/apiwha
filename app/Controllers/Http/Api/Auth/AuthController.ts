import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import {now} from "tarn/dist/utils";

export default class AuthController {


  public async login({request, response, auth}: HttpContextContract) {

    const {username, password} = request.all()


    try {
      const token = await auth.use('api').attempt(username, password)
      response.status(200).send(token)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async register({request, response, auth}: HttpContextContract) {


    const {name, email, username, password, phone} = request.all()


    try {
      const user = await User.create({
        'name': name,
        'email': email,
        'username': username,
        'password': password,
        'phone': phone,

      })

      const instance = await user.related('instances').create({
        name: username + '-' + now(),
        instance: this.generateSessionId(30)
      })
      const token = await auth.use('api').generate(user)
      response.status(201).send({
        token,
        instance
      })


    } catch (e) {
      return response.send(e)
    }
  }

  private generateSessionId(tamanho: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let resultado = '';

    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
  }

}
