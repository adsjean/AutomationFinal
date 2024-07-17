let shell = require("shelljs");

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
async function saveFile(req, res){
    shell.exec("npx tsc ./src/m3uParse.ts");    
    await shell.exec("node ./src/sshFTP.js");
    return `Sucesso - Arquivo salvo no servidor remoto com sucesso`;    
    // res.status(200).json({message: 'Sucesso - Arquivo salvo no servidor remoto com sucesso'});
}

//SHELL-04-BACK-END - RODA COMANDOS NO SERVIDOR REMOTO
async function sshCommands(req, res){
    await shell.exec("node ./src/sshCommands.js");
    return `**Entre via SSH e rode o código "./download_and_rename.sh" na pasta donde esta o arquivo`; 
    // res.status(200).json({message: 'Sucesso - Comando executado com suceeso'});
}


module.exports = {
    runTS,
    runJS,
    saveFile,
    sshCommands
}