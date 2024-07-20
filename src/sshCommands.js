var rexec = require('remote-exec');
const SSH = require('simple-ssh');
const nReadlines = require('n-readlines');
const broadbandLines = new nReadlines('./src/logado.txt');
console.log("Estamos aqui!!");

exec();

function exec() {
    console.log("Entramos!!");
    var connection_options = {
    port: 22,
    username: 'root',
    password: '07o560Hvx2QknyC6t3h'
    };

    let line;
    let username;
    let lineNumber = 1;

    while (line = broadbandLines.next()) {
        console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
        username = line.toString('ascii');
        lineNumber++;
    }

    var hosts = [
        '144.217.252.65'
    ];

    var cmds = [
     'cd /home/content/'+username+'/ && chmod +x download_and_rename_'+username+'.sh && pm2 start download_and_rename_'+username+'.sh' 
    ];

    rexec(hosts, cmds, connection_options, function(err){
        if(err){
            console.log(err);
        }else{
         console.log("Success!!");
        }
    });
};