const SftpClient = require('ssh2-sftp-client');
const sftp = new SftpClient();

exec();

function exec(){

    const config = {
        host: '144.217.252.65',
        port: 22,
        username: 'root',
        password: '07o560Hvx2QknyC6t3h'  
    };
    
    sftp.connect(config)
        .then(() => {
            // Upload the file
            sftp.put('./src/foldername.txt', '/home/content/foldername.txt', false);
            sftp.put('./src/urls.txt', '/home/content/urls.txt', false);
            sftp.put('./src/download_and_rename.sh', '/home/content/download_and_rename.sh', false);
            return sftp.put('./src/filenames.txt', '/home/content/filenames.txt', false);
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
