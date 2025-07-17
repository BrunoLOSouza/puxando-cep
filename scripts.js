function limpa_formulário_cep() {
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('estado').value = ("");
    document.getElementById('ibge').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('estado').value = (conteudo.uf);
        document.getElementById('ibge').value = (conteudo.ibge);
    } else {
        limpa_formulário_cep();
        alert("CEP inexiste!!, por favor: Digite um CEP valido.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById('rua').value = "Aguarde";
            document.getElementById('bairro').value = "Aguarde";
            document.getElementById('cidade').value = "Aguarde";
            document.getElementById('estado').value = "Aguarde";
            document.getElementById('ibge').value = "Aguarde";
            fetch('https://viacep.com.br/ws/' + cep + '/json/', {method: 'GET',
                headers: {
                'Accept': 'application/json'
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.estado;
                    document.getElementById('ibge').value = data.ibge;
                })
                .catch(error => console.error(error));

        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
};