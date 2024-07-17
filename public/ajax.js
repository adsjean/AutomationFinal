window.onload = function() {
    initForm();
};

var texto;

function initForm() {
    linha1 = "export const m3uExample = `#EXTM3U\\b#PLAYLIST:Test TV\\bAPAGUE APENAS ESTA LINHA e Cole a Lista Aqui - Não mudar o restante\\b`;"
    letra = linha1.split("\\b");
    linha1 = letra.join("\n");

    texto = `${linha1}`;
    

    document.getElementById('folderName').value = "";
    document.getElementById('txtArea').value = "";
    document.getElementById('txtArea').value = texto;
};


$(document).ready(function() {
    $('#mongoDB').on('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        $.ajax({
            type: 'POST',
            url: '/api/mongodb', // URL que processará os dados            
            success: function(response) {
                $('#resposta').html(response.message); // Insere a resposta do servidor na div com id resposta
            },
            error: function() {
                $('#resposta').html('Ocorreu um erro ao Salvar os dados.');
            }
        });
    });
});

$(document).ready(function() {
    $('#saveFile').on('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        $.ajax({
            type: 'POST',
            url: '/api/savefile', // URL que processará os dados            
            success: function(response) {
                $('#resposta').html(response.message); // Insere a resposta do servidor na div com id resposta
            },
            error: function() {
                $('#resposta').html('Ocorreu um erro ao Salvar o arquivo.');
            }
        });
    });
});

$(document).ready(function() {
    $('#downServer').on('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        $.ajax({
            type: 'POST',
            url: '/api/sshcommands', // URL que processará os dados            
            success: function(response) {
                $('#resposta').html(response.message); // Insere a resposta do servidor na div com id resposta
            },
            error: function() {
                $('#resposta').html('Ocorreu um erro ao Salvar o arquivo.');
            }
        });
    });
});

$(document).ready(function() {
    $('#processFile').on('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        if (!document.getElementById("folderName").validity.valid) { alert('Coloque o nome da Pasta'); return }
        if (texto == document.getElementById("txtArea").value) { alert('Coloque as URL`s'); return }

        var folderName = document.getElementById("folderName").value;
        var txtArea = document.getElementById("txtArea").value;        

        initForm();
        console.log(txtArea);

        var formData = {
            txtArea: txtArea,
            folderName: folderName
        };				

        $.ajax({
            type: 'POST',
            url: '/api/create', // URL que processará os dados  
            data: formData,          
            success: function(response) {
                $('#resposta').html(response.message); // Insere a resposta do servidor na div com id resposta
            },
            error: function() {
                $('#resposta').html('Ocorreu um erro ao Salvar o arquivo.');
            }
        });
    });
});