import { M3uParser, M3uPlaylist, M3uMedia } from 'm3u-parser-generator';
import { m3uExample } from './m3u-example';
import * as fs from 'fs';
let shell = require("shelljs")
const Library = require('./library');
var jsonQuery = require('json-query')
const express = require('express');
const bodyParser = require('body-parser');

const {
  runTS,
  runJS,
  saveFile,
  sshCommands// Certifique-se de usar a nomenclatura correta
} = require('./shellRun');




//Salva no mongoDB - Ja esta a funcionar, falta apenas selecionar pelos dados que desejar
async function saveMongDB(){

  const parsedPlaylist = M3uParser.parse(m3uExample);  

  try {    

    //Pega o tamanho do Json na Aba Medias do Json
    var lengths =  Object.keys(parsedPlaylist.medias).length

    for (let i = 0; i < lengths; i++) {

      // Check if the username already exists in the database
      // const existingMovie = await Library.findOne({ name: parsedPlaylist.medias[i].name });
      // if (existingMovie) {
      //   console.log('Filme não inserido:'+ parsedPlaylist.medias[i].name + ' - Verifique o nome');
      // } else {
    
          //Envia o dado para o MongoDB
          const library = await Library.create(parsedPlaylist.medias[i]);

          // Abrir um arquivo de texto para escrita
          const file = fs.createWriteStream('./src/urls.txt', { flags: 'a' });

          var linhaURL = parsedPlaylist.medias[i].location;
          var letra = linhaURL.split('""');
          linhaURL = letra.join("");

          // Escreve a URL em cada linha do txt      
          file.write(`${linhaURL}\n`);    
    
          // Fechar o arquivo
          file.end();

          // Abrir um arquivo de texto para escrita
          const file2 = fs.createWriteStream('./src/filenames.txt', { flags: 'a' });
          
          //split de variavel indefinida necessario if/else ??
          var linhaNomes = parsedPlaylist.medias[i].name ?? "Nome não encontrado";
          var letra = linhaNomes.split('""');
          linhaNomes = letra.join("");

          // Escreve a URL em cada linha do txt      
          file2.write(`${linhaNomes}\n`);
    
          // Fechar o arquivo
          file2.end();
      // }

    }   

    console.log('Acima tem a lista dos filmes que não foram inseridos no banco de dados!');
    
    return `Filmes não duplicados foram inseridos no banco de dados - verifique o console`;
    
    // await res.json({message: 'Inserido no banco de dados com sucesso'})
    // await res.status(200).render("home");
    // await res.status(200).json({message: 'Inserido no banco de dados com sucesso'});  

  } catch (error) {

    console.log(error.message);
    return ({message: 'Não inserido no banco de dados'});
    // res.status(500).json({message: error.message})

  }
  
}

async function eraseFiles(req, res) {

  fs.truncate('./src/urls.txt', 0, function(){console.log('done')})
  fs.truncate('./src/filenames.txt', 0, function(){console.log('done')})
  
}

//Salva MongoDB e mostra Json
//Save MongoDB and show Json on body.
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
      
      console.log(folderName);
      fs.writeFileSync('./src/foldername.txt', folderName, 'utf8');  
      
      console.log(txtArea);
      fs.writeFileSync('./src/m3u-example.ts', txtArea, 'utf8');

      // //remove url.txt and filenames.txt
      eraseFiles(req, res);

      //transcopiler all to js and restart service fast
      //shell.exec("npx tsc ./src/m3uParse.ts");
      //await saveMongDB(req, res);
      
      return `Lista carregada com sucesso - Siga os passos pelos números`;
      // res.status(200).json({txtArea: txtArea, folderName: folderName});


    } catch (error) {

      console.log(error.message);
      return `Lista não carregada - Tente carregar a lista novamente`;
      // res.status(500).json({message: error.message})

    }
  }

module.exports = {
    exportM3uToJson,
    createTS,
    saveMongDB,
    eraseFiles
}