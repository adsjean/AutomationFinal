"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var m3u_parser_generator_1 = require("m3u-parser-generator");
var m3u_example_1 = require("./m3u-example");
var fs = require("fs");
var shell = require("shelljs");
var Library = require('./library');
var jsonQuery = require('json-query');
var express = require('express');
var bodyParser = require('body-parser');
var _a = require('./shellRun'), runTS = _a.runTS, runJS = _a.runJS, saveFile = _a.saveFile, sshCommands = _a.sshCommands // Certifique-se de usar a nomenclatura correta
;
//Salva no mongoDB - Ja esta a funcionar, falta apenas selecionar pelos dados que desejar
function saveMongDB() {
    return __awaiter(this, void 0, void 0, function () {
        var parsedPlaylist, lengths, i, library, file, linhaURL, letra, file2, linhaNomes, letra, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parsedPlaylist = m3u_parser_generator_1.M3uParser.parse(m3u_example_1.m3uExample);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    lengths = Object.keys(parsedPlaylist.medias).length;
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < lengths)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Library.create(parsedPlaylist.medias[i])];
                case 3:
                    library = _b.sent();
                    file = fs.createWriteStream('./src/urls.txt', { flags: 'a' });
                    linhaURL = parsedPlaylist.medias[i].location;
                    letra = linhaURL.split('""');
                    linhaURL = letra.join("");
                    // Escreve a URL em cada linha do txt      
                    file.write("".concat(linhaURL, "\n"));
                    // Fechar o arquivo
                    file.end();
                    file2 = fs.createWriteStream('./src/filenames.txt', { flags: 'a' });
                    linhaNomes = (_a = parsedPlaylist.medias[i].name) !== null && _a !== void 0 ? _a : "Nome não encontrado";
                    letra = linhaNomes.split('""');
                    linhaNomes = letra.join("");
                    // Escreve a URL em cada linha do txt      
                    file2.write("".concat(linhaNomes, "\n"));
                    // Fechar o arquivo
                    file2.end();
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Acima tem a lista dos filmes que não foram inseridos no banco de dados!');
                    return [2 /*return*/, "Filmes n\u00E3o duplicados foram inseridos no banco de dados - verifique o console"];
                case 6:
                    error_1 = _b.sent();
                    console.log(error_1.message);
                    return [2 /*return*/, ({ message: 'Não inserido no banco de dados' })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function eraseFiles(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.truncate('./src/urls.txt', 0, function () { console.log('done'); });
            fs.truncate('./src/filenames.txt', 0, function () { console.log('done'); });
            return [2 /*return*/];
        });
    });
}
//Salva MongoDB e mostra Json
//Save MongoDB and show Json on body.
function exportM3uToJson(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedPlaylist;
        return __generator(this, function (_a) {
            try {
                parsedPlaylist = m3u_parser_generator_1.M3uParser.parse(m3u_example_1.m3uExample);
                console.log(parsedPlaylist);
                res.status(200).send(parsedPlaylist);
            }
            catch (error) {
                console.error('There was an error', error);
                alert('Houve um erro ao buscar a playList.');
                res.status(500).send('Error retrieving playlist');
            }
            return [2 /*return*/];
        });
    });
}
//Pega txtArea(Body) e cria o arquivo TS
function createTS(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var txtArea, folderName;
        return __generator(this, function (_a) {
            try {
                console.log('CreateTS - Dentro');
                txtArea = req.body.txtArea;
                folderName = req.body.folderName;
                console.log(folderName);
                fs.writeFileSync('./src/foldername.txt', folderName, 'utf8');
                console.log(txtArea);
                fs.writeFileSync('./src/m3u-example.ts', txtArea, 'utf8');
                // //remove url.txt and filenames.txt
                eraseFiles(req, res);
                //transcopiler all to js and restart service fast
                //shell.exec("npx tsc ./src/m3uParse.ts");
                //await saveMongDB(req, res);
                return [2 /*return*/, "Lista carregada - AGUARDE **(5)seg e siga os passos pelos n\u00FAmeros"];
                // res.status(200).json({txtArea: txtArea, folderName: folderName});
            }
            catch (error) {
                console.log(error.message);
                return [2 /*return*/, "Lista n\u00E3o carregada - Tente carregar a lista novamente"];
                // res.status(500).json({message: error.message})
            }
            return [2 /*return*/];
        });
    });
}
module.exports = {
    exportM3uToJson: exportM3uToJson,
    createTS: createTS,
    saveMongDB: saveMongDB,
    eraseFiles: eraseFiles
};
