import {create, Whatsapp} from "venom-bot"

class Venom
{
    private client:Whatsapp

    constructor() {
        this.initialize()
    }

    async sendtext(to:string, body:string)
    {

        //5575997140438@c.us
       await this.client.sendText(to, body)
    }

    private initialize(){
        const qr =(base64Qrimg:string) =>{
            return base64Qrimg

        }

        const status =(statusSession:string) =>{
                return statusSession
        }

        const start =(client:Whatsapp) =>{
            this.client = client
          //  this.sendtext('5575997140438@c.us', 'testando api')
        }

        create('nuno', qr, status,
         {

            browserPathExecutable: '/usr/bin/google-chrome', // browser executable path
            folderNameToken: 'tokens', //folder name when saving tokens
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
            disableWelcome: false, // Will disable the welcoming message which appears in the beginning
            updatesLog: true, // Logs info updates automatically in terminal
            autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
            createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
            addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
            userProxy: '', // Proxy login username
            userPass: '' // Proxy password
          })

        .then((client) => start(client))
        .catch((error)=> console.log(error))
    }



}
export default Venom


