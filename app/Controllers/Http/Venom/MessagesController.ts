import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";


import {sessions} from "App/Controllers/Http/Venom/AuthController";




export const SendText = async ({request, response}: HttpContextContract) => {

  const instance= request.header('x_instance')

  const {phone, message} = request.all()

  // @ts-ignore
  await sessions[instance].sendText('55'+phone+'@c.us', message)

  response.status(200).send('ok')

};



