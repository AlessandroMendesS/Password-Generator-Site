function pegarTipoCarac () {
    const uppercase = document.querySelector('#incluse_uppercase').checked;
    const lowercase = document.querySelector('#incluse_lowercase').checked;
    const number = document.querySelector('#incluse_number').checked;
    const specialcharacter = document.querySelector('#incluse_special_character').checked;
    const charTypes = []

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if (number) {
        charTypes.push('0123456789')
    }

    if (specialcharacter) {
        charTypes.push('!@#$%^&*()_+')
    }
    return charTypes;
}

function pegarTamanhoSenha () {
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 100) {
        message('Tamanho inválido, digite um valor entre 4 e 100', 'warning');
    }
    
    return size;
}

function tipoCaracteresAleatorio (charTypes) {
    const indexrandom = Math.floor(Math.random() * charTypes.length);
    return charTypes[indexrandom][Math.floor(Math.random() * charTypes[indexrandom].length)];
}

function message (text,status = 'success') {
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: status == 'success' ? 'var(--color-accent)' : 'red',
            boxShadow: 'none'
        }
    }).showToast();
}

function gerarSenha (size, charTypes) {
    let passwordGenerated = '';
    while (passwordGenerated.length < size) {
        passwordGenerated += tipoCaracteresAleatorio(charTypes);
    }

    return passwordGenerated;
}

document.querySelector('#generate').addEventListener('click', function() {
    const size = pegarTamanhoSenha();
    const charTypes = pegarTipoCarac();

    if(!size){
        return;
    }

    if(!charTypes.length){
        message('Selecione pelo menos um tipo de caractere', 'warning');
        return;
    }

    const passwordGenerated = gerarSenha(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function() {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso', 'success');
})