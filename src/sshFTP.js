const SftpClient = require('ssh2-sftp-client');
const sftp = new SftpClient();
const nReadlines = require('n-readlines');
const broadbandLines = new nReadlines('./src/logado.txt');

exec();

function exec(){

    const config = {
        host: '67.211.222.190',
        port: 22,
        username: 'st49935',
        password: 'Amorsodemae2016@'  
    };
    
    sftp.connect(config)
        .then(() => {

            let line;
            let username;
            let lineNumber = 1;
        
            while (line = broadbandLines.next()) {
                // console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
                username = line.toString('ascii');
                lineNumber++;
            }

            // Upload the file
            sftp.put('./src/'+username+'/foldername.txt', '/home/st49935/public_html/content/4TB/'+username+'/foldername.txt', false);
            sftp.put('./src/'+username+'/urls.txt', '/home/st49935/public_html/content/4TB/'+username+'/urls.txt', false);
            sftp.put('./src/download_and_rename.sh', '/home/st49935/public_html/content/4TB/'+username+'/download_and_rename_'+username+'.sh', false);
            return sftp.put('./src/'+username+'/filenames.txt', '/home/st49935/public_html/content/4TB/'+username+'/filenames.txt', false);
        })
        .then(() => {
            // alert('Arquivos salvo no servidor com sucesso');
            console.log('File uploaded successfully!');
        })
        .catch((err) => {
            // alert('Erro: houve um erro ao salvar o arquivo no servidor');
            console.error('Error uploading file:', err);
        })
        .finally(() => {
            sftp.end();
    });

}
