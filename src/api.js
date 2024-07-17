let shell = require("shelljs");

const {
  runTS,
  runJS,
  tsGenerate,
  sshCommands// Certifique-se de usar a nomenclatura correta
} = require('./shellRun');

const {
  exportM3uToJson,
  createTS,
  saveMongDB // Certifique-se de usar a nomenclatura correta
} = require('./m3uParse');


const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');


module.exports = (pool) => {  
  // Magic happen RunTS(POST) e RUNJS(GET) - Arquivos essenciais para a aplicação
  router.post('/magic',  (req, res) => runTS(req, res)); //Gera o arquivo .JS//SHELL-Proteger
  //router.get('/magic',  (req, res) => runJS(req, res)); //Gera o Json do file m3u-example//SHELL-Proteger

  // To TS - Recebe o txtArea e cria o m3u-example.TS
  // router.post('/create', (req, res) => createTS(req, res)); // Gera o file m3u-example  
  
  // API Json a ser mostrada na tela - Usada para capturar dados da lista como URL, Nome, Logo, etc
  router.get('/getjson', (req, res) => exportM3uToJson(req, res));
 
 
  // Create - Salva apenas os dados que desejar no banco de dados mongoDB
 router.post('/create',async function(req,res){

  const resultado = await createTS(req, res);
  console.log(resultado)
  res.json({ message: resultado });

  }) 

  // Save MongoDB - Salva apenas os dados que desejar no banco de dados mongoDB
  router.post('/mongodb',async function(req,res){

    const resultado = await saveMongDB(req, res);
    console.log(resultado)
    res.json({ message: resultado });

  })

  // Save saveFile - Salva arquivos no servidor
  router.post('/savefile',async function(req,res){
    await shell.exec("node ./src/sshFTP.js");
    console.log("Ja salvei os arquivos no servidor")
    const resultado = await tsGenerate(req, res);
    console.log(resultado)
    res.json({ message: resultado });
    
  })

  // commandSSH - Roda comando dentro do servidor dedicado
  router.post('/sshcommands',async function(req,res){

    const resultado = await sshCommands(req, res);
    console.log(resultado)
    res.json({ message: resultado });
    
  })
  
  // Acesso ao servidor remoto - Salva arquivo e Roda comandos no SSH
  // router.post('/saveFile', (req, res) => saveFile(req, res));
  // router.post('/sshCommands', (req, res) => sshCommands(req, res));

  return router;
};