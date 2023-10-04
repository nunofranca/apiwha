import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {sessions} from "App/Controllers/Http/Api/Instance/InstancesController";

export default class MessagesController {


  public async sendText({request, response}: HttpContextContract) {


    const instanceId = request.header('instance-id')


    if (!instanceId || !sessions[instanceId]) {
      return response.status(400).send('InstanceId inexistente na requisição ou WhatsApp desconectado')
    }


    const {phone, message} = request.all()

    // @ts-ignore
    await this.returnSessionWhats(instanceId).sendText('55' + phone + '@c.us', message)

    response.status(201).send({
      'message': 'Mensagem enviada'
    })
  }

  public async sendFile({request, response}: HttpContextContract) {


    const instanceId = request.header('instance-id')


    if (!instanceId || !sessions[instanceId]) {
      return response.status(400).send('InstanceId inexistente na requisição ou WhatsApp desconectado')
    }


    const {phone, pathImage} = request.all()



    // @ts-ignore
    await this.returnSessionWhats(instanceId).sendImage('55' + phone + '@c.us', pathImage)

    response.status(200).send('ok')
  }




  private returnSessionWhats(instanceId:string) {
    for (instanceId in sessions) {
      if (sessions.hasOwnProperty(instanceId)) {
        return sessions[instanceId];
      }
    }
  }
}



