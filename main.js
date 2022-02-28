const { app, ipcMain, ipcRenderer, BrowserWindow, nativeImage } = require('electron');
const { exec } = require("child_process");


var mainWindow = null;

async function createWindow(){
    mainWindow = new BrowserWindow({
        width:400,
        height:500,
        resizable:false,
        autoHideMenuBar:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });

    await mainWindow.loadFile('src/pages/index.html');
}

// ON Ready
app.whenReady().then(createWindow);


ipcMain.on("eventoButton", function(event, args) {
    let nomeUsuario = args['nomeUsuario'];
    let localEmpresa = args['localEmpresa'];

    const caminhosArapoti = [
        `@echo off`,
        `ipconfig /flushdns`,
        `net use n: /del`,
        `net use y: /del`,
        `net use p: /del`,
        `net use z: /del`,
        `net use n: \\\\braras001\\arapoti_mill$ /persistent:no`,
        `net use p: \\\\bopaper.local\\shares\\common /persistent:no`,
        `net use u: \\\\braras001\\users$\\${nomeUsuario} /persistent:no`,
        `net use y: \\\\braras001\\public$ /persistent:no`
    ]

    const caminhosPisa = [
        // verificar.
        `@echo off`,
        `ipconfig /flushdns`,
        `net use n: /del`,
        `net use y: /del`,
        `net use p: /del`,
        `net use z: /del`,
        `net use y: \\\\braras001\\public$ /persistent:no`,
        `net use u: \\\\10.218.6.129\\homedirs\\${nomeUsuario} /persistent:no`,
        `net use n: \\\\pisa.com\\shares\\common\\ARA /persistent:no`,
        `net use p: \\\\pisa.com\\shares\\common\ /persistent:no`,
    ]
    if(localEmpresa == '1'){
        for(let item in caminhosArapoti){
            exec(caminhosArapoti[item]);
        }
    }else
    if(localEmpresa == '2'){
        for(let item in caminhosPisa){
            exec(caminhosPisa[item]);
        }
    }
    mainWindow.loadFile("src/pages/success.html")
});

ipcMain.on("buttonEncerrar", function(event, args){
    app.exit();
});