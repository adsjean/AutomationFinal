import { M3uParser, M3uPlaylist, M3uMedia } from 'm3u-parser-generator';
import { m3uExample } from './m3u-example';
import * as fs from 'fs';
let shell = require("shelljs")
const Library = require('./library');
var jsonQuery = require('json-query')
const express = require('express');
const bodyParser = require('body-parser');
var now = new Date().toISOString().slice(0, 10);
const fs2 = require('fs/promises')
const nReadlines = require('n-readlines');
const broadbandLines = new nReadlines('./src/logado.txt');

const {
  // runTS,
  // runJS,
  saveFile,
  sshCommands// Certifique-se de usar a nomenclatura correta
} = require('./shellRun');




//Salva no mongoDB - Ja esta a funcionar, falta apenas selecionar pelos dados que desejar
async function saveMongDB(){

  const parsedPlaylist = M3uParser.parse(m3uExample);  

  try {    

    //Pega o tamanho do Json na Aba Medias do Json
    var lengths =  Object.keys(parsedPlaylist.medias).length
    const filePath = './src/logs/log-'+now+'.txt';

    let line;
    let username;
    let lineNumber = 1;

    while (line = broadbandLines.next()) {
        console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
        username = line.toString('ascii');
        lineNumber++;
    }

    for (let i = 0; i < lengths; i++) {

      // Check if the username already exists in the database
      const existingMovie = await Library.findOne({ name: parsedPlaylist.medias[i].name });
      const someGroup = await Library.findOne({ "attributes.group-title": parsedPlaylist.medias[i].attributes['group-title'] });
      
      //console.log(someGroup)
      console.log(parsedPlaylist.medias[i].attributes['group-title'])
      if (someGroup && existingMovie){
          console.log('Já existe, não inserido: '+ parsedPlaylist.medias[i].name + ' Arquivo nº = ' + [i+1]);          
          await fs2.appendFile(filePath, `'Já existe, não inserido: ${parsedPlaylist.medias[i].name} Arquivo nº = ${[i+1]}\r\n`, 'utf8');
       } else {
          
          //Envia o dado para o MongoDB
          const library = await Library.create(parsedPlaylist.medias[i]);

          // Abrir um arquivo de texto para escrita
          const file = fs.createWriteStream('./src/'+username+'/urls.txt', { flags: 'a' });

          var linhaURL = parsedPlaylist.medias[i].location;
          var letra = linhaURL.split('""');
          linhaURL = letra.join("");

          // Escreve a URL em cada linha do txt      
          file.write(`${linhaURL}\n`);    
    
          // Fechar o arquivo
          file.end();

          // Abrir um arquivo de texto para escrita
          const file2 = fs.createWriteStream('./src/'+username+'/filenames.txt', { flags: 'a' });
          
          //split de variavel indefinida necessario if/else ??
          var linhaNomes = parsedPlaylist.medias[i].name ?? "Nome não encontrado";
          var letra = linhaNomes.split('""');
          linhaNomes = letra.join("");

          // Escreve a URL em cada linha do txt      
          file2.write(`${linhaNomes}\n`);
    
          // Fechar o arquivo
          file2.end();

          console.log('Inserido no banco e para download:'+ parsedPlaylist.medias[i].name + ' Arquivo nº = ' + [i+1]);
          
          await fs2.appendFile(filePath, `'Inserido no banco e para download: ${parsedPlaylist.medias[i].name} Arquivo nº = ${[i+1]}\r\n`, 'utf8');
       }
    
          
      // }

    }   

    console.log('--- CONTROLE OLHA ACIMA OU NO ARQUIVO DE LOG ---');
    
    return `Filmes não duplicados foram inseridos no banco de dados - verifique o console`; 


  } catch (error) {

    console.log(error.message);
    return ({message: 'Não inserido no banco de dados'});

  }
  
}

//Show Json on body.
async function exportM3uToJson(req, res) {
    try {

      //get Json com todos elementos
      //get Json all elements
      const parsedPlaylist = M3uParser.parse(m3uExample);      

      console.log(parsedPlaylist);
      res.status(200).send(parsedPlaylist);
      
    } catch (error) {

      console.error('There was an error', error);
      alert('Houve um erro ao buscar a playList.');
      res.status(500).send('Error retrieving playlist');
      
    }
}

//Pega txtArea(Body) e cria o arquivo TS
async function createTS(req, res){
    try {
      console.log('CreateTS - Dentro');
      const {txtArea} = req.body; 
      const {folderName} = req.body;

      const filePath = './src/logs/log-'+now+'.txt';

      let line;
      let username;
      let lineNumber = 1;

      while (line = broadbandLines.next()) {
          console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
          username = line.toString('ascii');
          lineNumber++;
      }

      // //remove url.txt and filenames.txt
      fs.truncate('./src/'+username+'/urls.txt', 0, function(){console.log('done')})
      fs.truncate('./src/'+username+'/filenames.txt', 0, function(){console.log('done')})

      // Abrir um arquivo de texto para escrita
      fs.createWriteStream(filePath, { flags: 'a' });

      await fs2.appendFile(filePath, `${folderName}\r\n`, 'utf8');
      
      console.log(folderName);
      fs.writeFileSync('./src/'+username+'/foldername.txt', folderName, 'utf8');  
      
      console.log(txtArea);
      fs.writeFileSync('./src/m3u-example.ts', txtArea, 'utf8');      
      
      return `Lista carregada - AGUARDE **(5)seg e siga os passos pelos números`;

    } catch (error) {

      console.log(error.message);
      return `Lista não carregada - Tente carregar a lista novamente`;
      // res.status(500).json({message: error.message})

    }
  }

module.exports = {
    exportM3uToJson,
    createTS,
    saveMongDB
}