import {create, Whatsapp} from "venom-bot";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Drive from '@ioc:Adonis/Core/Drive'
import Instance from "App/Models/Instance";

export const sessions: Record<string, Whatsapp> = {};


export default class InstancesController {


  public async create({request, response}: HttpContextContract) {


    const {instanceId} = request.all()


    const instanceExist = await Instance.query().where('instance', instanceId).first()

    if (!instanceExist) {
      return response.status(400).send('Instância não existe')
    }

    if (instanceExist.status ==='isLogged'){
      return response.status(400).send({
        instance: instanceId,
        status: 'isLogged'
      })
    }
    Drive.delete(`tokens/${instanceId}`)


    await new Promise<string>((resolve) => {
      create(
        //session
        instanceId,
        //catchQR
        async (base64Qrimg) => {
          resolve(base64Qrimg);
          response.status(200).send({
            base64Qrimg,
          })

        },
        // statusFind
        async (statusSession, session) => {

          if (statusSession === 'qrReadSuccess') {
            await Instance.query().where('instance', session).update({
              status: 'isLogged'
            })
            return response.status(200).send('qrReadSuccess')
          }

          if (statusSession === 'desconnectedMobile') {

            await Instance.query().where('instance', session).update({
              status: 'notLogged'
            })
            await Drive.delete(`tokens/${instanceId}`)
          }

          if (statusSession === 'notLogged') {
            await Instance.query().where('instance', session).update({
              status: 'notLogged'
            })
            return response.status(200).send('notLogged')
            await Drive.delete(`tokens/${instanceId}`)
          }
          if (statusSession === 'qrReadFail') {
            await Instance.query().where('instance', session).update({
              status: 'notLogged'
            })
            await Drive.delete(`tokens/${instanceId}`)
          }
          if (statusSession === 'noOpenBrowser') {
            await Instance.query().where('instance', session).update({
              status: 'notLogged'
            })
            await Drive.delete(`tokens/${instanceId}`)
          }

          //res.status(200).send({statusSession, session})
          //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
          //Create session wss return "serverClose" case server for close

        },
        // options
        {
          browserPathExecutable: '/usr/bin/google-chrome', // browser executable path
          folderNameToken: 'tmp/tokens', //folder name when saving tokens
          mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
          headless: 'new', // you should no longer use boolean false or true, now use false, true or 'new' learn more https://developer.chrome.com/articles/new-headless/
          devtools: false, // Open devtools by default
          debug: false, // Opens a debug session
          logQR: true, // Logs QR automatically in terminal
          browserWS: '', // If u want to use browserWSEndpoint
          browserArgs: ['--user-agent'], // Original parameters  ---Parameters to be added into the chrome browser instance
          addBrowserArgs: [''], // Add broserArgs without overwriting the project's original
          puppeteerOptions: {}, // Will be passed to puppeteer.launch
          disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
          disableWelcome: true, // Will disable the welcoming message which appears in the beginning
          updatesLog: true, // Logs info updates automatically in terminal
          autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
          createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
          addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
          userProxy: '', // Proxy login username
          userPass: '' // Proxy password
        }
      )
        .then(async (client: Whatsapp) => {

          sessions[instanceId] = client


        })
        .catch((erro) => {
          console.log(erro);
        });
    })

  }


}

