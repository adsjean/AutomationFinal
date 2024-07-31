const { Client } = require('ssh2');
const nReadlines = require('n-readlines');
const broadbandLines = new nReadlines('./src/logado.txt');

let line;
let usernameLogado;
let lineNumber = 1;

while (line = broadbandLines.next()) {
    console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
    usernameLogado = line.toString('ascii');
    lineNumber++;
}

const conn = new Client();
const username = usernameLogado; // Example username
const host = '67.211.222.190';
const password = 'Amorsodemae2016@';

conn.on('ready', (req, res) => {
  console.log('Client :: ready');
  conn.exec(`cd /home/st49935/public_html/content/4TB/${username}/ && chmod +x download_and_rename_${username}.sh && nohup ./download_and_rename_${username}.sh > output.log `, (err, stream) => {
    sendResponse("Command executing in background.");
    if (err) {
        console.error("Execution error:", err);
        conn.end();
        sendResponse(err.message);
        return;
    }

    stream.on('close', (code, signal) => {
        console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
        conn.end();
        sendResponse("Command executed in background Successfully.");
      }).on('data', (data) => {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', (data) => {
        console.log('STDERR: ' + data);
      });
    });

}).connect({
  host,
  port: 22,
  username: 'st49935',
  password,
});

function sendResponse(response) {
    // Implement this function to send a response back to the client.
    // This could be an HTTP response, a message queue update, etc.
    console.log(response);
  }
