var rexec = require('remote-exec');
const SSH = require('simple-ssh');
console.log("Estamos aqui!!");

exec();

function exec() {
    console.log("Entramos!!");
    var connection_options = {
    port: 22,
    username: 'root',
    password: '07o560Hvx2QknyC6t3h'
    };

//     var ssh = new SSH({
//         host: '144.217.252.65',
//         user: 'root',
//         pass: '07o560Hvx2QknyC6t3h'
//     });

    

//    var CMD = ssh
// //    .exec('cd /home/content/ && chmod +x download_and_rename.sh && ./download_and_rename.sh'
//             .exec('cd /home/content/ && chmod +x download_and_rename.sh' , { out: function (stdout) { console.log(stdout); } })
//             .start();

//     ssh.exec(CMD, {
//         out: function (stdout) { console.log(stdout); },
//         err: function (stderr) { console.log(stderr); },
//         exit: function (code) { console.log(code); }
//     }).start();

    var hosts = [
        '144.217.252.65'
    ];

    var cmds = [
     'cd /home/content/ && chmod +x download_and_rename.sh'
    ];

    rexec(hosts, cmds, connection_options, function(err){
        if(err){
            console.log(err);
        }else{
         console.log("Success!!");
        }
    });
};