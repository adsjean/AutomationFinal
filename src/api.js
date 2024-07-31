const {
  jsGenerate,
  sshCommands// Certifique-se de usar a nomenclatura correta
} = require('./shellRun');

const {
  exportM3uToJson,
  createTS,
  saveMongDB // Certifique-se de usar a nomenclatura correta
} = require('./m3uParse');

let shell = require("shelljs");
const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const { Worker } = require("node:worker_threads");


module.exports = (pool) => {  
  // Magic happen RunTS(POST) - Arquivos essenciais para testar POSTS/GET a aplicação
  // router.post('/magic',  (req, res) => runTS(req, res)); //Gera o arquivo .JS//SHELL-Proteger

  // API Json a ser mostrada na tela - Usada para capturar dados da lista como URL, Nome, Logo, etc
  router.get('/getjson', (req, res) => exportM3uToJson(req, res));
 
 
  // Create - Salva apenas os dados que desejar no banco de dados mongoDB
 router.post('/create',async function(req,res){

    const resultado = await createTS(req, res);    
    console.log(resultado)
    res.json({ message: resultado });
    jsGenerate(req, res);

  }) 

  // Save MongoDB - Salva apenas os dados que desejar no banco de dados mongoDB
  router.post('/mongodb',async function(req,res){
    //await tsGenerate(req, res);
    const resultado = await saveMongDB(req, res);
    console.log(resultado)
    res.json({ message: resultado });

  })

  // Save saveFile - Salva arquivos no servidor
  router.post('/savefile',async function(req,res){
    const resultado  = await shell.exec("node ./src/sshFTP.js");
    console.log("Ja salvei os arquivos no servidor")
    // const resultado = await tsGenerate(req, res);
    console.log(resultado)
    res.json({ message: resultado });
    
  })

  // commandSSH - Roda comando dentro do servidor dedicado
  router.post('/sshcommands',async function(req,res){
    const worker = new Worker("./src/sshCommands.js"); 
    res.json({ message: `Download sendo execultado dentro do servidor remoto. Confira acessado por FTP ou SSH` });    
  })
  
  return router;
};