let shell = require("shelljs");
var now = new Date();
const fs = require('fs/promises')
const { Worker } = require("node:worker_threads");

//SHELL-01-CLIENTSIDE-NÃO-ESTA-EM-USO-NO-CLIENT-SIDE
function runTS(req, res) {    
    shell.exec("echo shell.exec works");
    shell.exec("npx tsc ./src/m3uParse.ts");
    res.status(200).json({message: 'Sucesso - JavaScript Gerado'});
}

//SHELL-02-CLIENTSIDE-NÃO-NECESSARIO
function runJS(req, res){
    shell.exec("node ./src/m3uParse.js");
    res.status(200).json({message: 'Sucesso - Json file Criado'});
}

//SHELL-03-BACK-END - SALVA O ARQUIVO NO DEDICADO PARA DOWNLOAD
async function jsGenerate(req, res){  
    
    const {folderName} = req.body;

    console.log("Estou processando o TS agora") 
    await shell.exec("npx tsc ./src/m3uParse.ts");
    
    const filePath = './src/salvouArquivos.txt';
    await fs.appendFile(filePath, `Pasta: ${folderName} - log: Lista Carregada - Data: ${now}\r\n`, 'utf8');
}

//SHELL-04-BACK-END - RODA COMANDOS NO SERVIDOR REMOTO
async function sshCommands(req, res){
    const worker = new Worker("./src/sshCommands.js");    
    return `Download sendo execultado dentro do servidor remoto. Confira acessado por FTP ou SSH`; 
}


module.exports = {
    // runTS,
    // runJS,
    jsGenerate,
    sshCommands
}