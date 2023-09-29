import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import {create, Whatsapp} from "venom-bot";

const sessions: Record<string, Whatsapp> = {};
export const auth = async ({request, response}:HttpContextContract) => {


  const {name} = request.all()

  if (sessions[name]) {

    console.log(sessions[name], 'ok')
    await sessions[name].sendText('5575997140438@c.us', 'teste')
      .then((messageId: any) => {
      console.log(`Mensagem enviada com sucesso. ID da mensagem: ${messageId}`);
      response.status(200).send({ success: true });
    })
      .catch((error: any) => {
        console.error(`Erro ao enviar mensagem: ${error}`);
        response.status(500).send({ error: 'Erro ao enviar mensagem' });
      });

  }else{

  await new Promise<string>((resolve) => {
    create(
      //session
      name,
      //catchQR
      async (base64Qrimg) => {
        resolve(base64Qrimg);
        response.status(200).send({'base64': base64Qrimg})

      },
      // statusFind
      async (statusSession) => {

        response.send(statusSession)

        if (statusSession === 'serverClose') {
          // Remova a sessão quando o servidor estiver fechado
          delete sessions[name];
        }

        //res.status(200).send({statusSession, session})
        //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
        //Create session wss return "serverClose" case server for close

      },
      // options
      {
        browserPathExecutable: '/usr/bin/google-chrome', // browser executable path
        folderNameToken: 'tokens', //folder name when saving tokens
        mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
        headless: 'new', // you should no longer use boolean false or true, now use false, true or 'new' learn more https://developer.chrome.com/articles/new-headless/
        devtools: false, // Open devtools by default
        debug: false, // Opens a debug session
        logQR: true, // Logs QR automatically in terminal
        browserWS: '', // If u want to use browserWSEndpoint
        browserArgs: [''], // Original parameters  ---Parameters to be added into the chrome browser instance
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
      .then((client:Whatsapp) => {
        sessions[name] = client;

      })
      .catch((erro) => {
        console.log(erro);
      });
  })

  }
}


