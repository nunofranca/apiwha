import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export const index = async ({view}: HttpContextContract) => {
  return await view.render('painel.dashboard.index')
}
