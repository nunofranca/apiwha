import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Instance from "App/Models/Instance";

export default class InstanceController {


  public async index({view}: HttpContextContract) {
    const instances = await Instance.all()

    return await view.render('panel.instance.index', {
      'instances': instances
    })
  }


  public async store({request, response, auth}: HttpContextContract) {

    const {name} = request.all()
    const idInstance = this.generateIdInstance(100)

    if (auth.isLoggedIn && auth.user) {
      const user = auth.user
      const instance = await user.related('instances').create({
        'name': name,
        'instance': idInstance,
      })
      return response.redirect().toRoute('instance.show', {id: instance.id})
    }
  }

  public async show({request,  view}: HttpContextContract) {

    const instance: Instance | null = await Instance.find(request.param('id'))

    return await view.render('panel.instance.show', {
      'instance': instance
    })


  }


  private generateIdInstance(tam: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';

    for (let i = 0; i < tam; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
  }


}


