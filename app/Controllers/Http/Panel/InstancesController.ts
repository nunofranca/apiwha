import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'


export default class InstanceController {

    public async index({view}:HttpContextContract){
      return await view.render('panel.instance.index')
    }

  public async store({request, response}:HttpContextContract){

    return await view.render('panel.instance.index')

  }



}


