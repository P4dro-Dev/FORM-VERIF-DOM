document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Limpa erros anteriores
    clearErrors();
    
    // Validação dos campos
    const nomeValido = validateNome();
    const emailValido = validateEmail();
    const telefoneValido = validateTelefone();
    
    // Se todos os campos forem válidos, pode enviar
    if (nomeValido && emailValido && telefoneValido) {
        alert('Formulário enviado com sucesso!');
        this.reset(); // Limpa o formulário
    }
});

function validateNome() {
    const nomeInput = document.getElementById('nome');
    const nomeError = document.getElementById('nomeError');
    const nome = nomeInput.value.trim();
    
    if (nome.length < 5 || nome.length > 40) {
        nomeError.classList.add('show');
        nomeInput.classList.add('invalid');
        return false;
    }
    
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();
    
    if (!email.includes('@')) {
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        return false;
    }
    
    return true;
}

function validateTelefone() {
    const telefoneInput = document.getElementById('telefone');
    const telefoneError = document.getElementById('telefoneError');
    const telefone = telefoneInput.value.trim();
    
    // Expressão regular para validar o formato (##)#-####-####
    const regex = /^\(\d{2}\)\d-\d{4}-\d{4}$/;
    
    if (!regex.test(telefone)) {
        telefoneError.classList.add('show');
        telefoneInput.classList.add('invalid');
        return false;
    }
    
    return true;
}

function clearErrors() {
    // Remove todas as mensagens de erro
    document.querySelectorAll('.error').forEach(error => {
        error.classList.remove('show');
    });
    
    // Remove a classe 'invalid' de todos os inputs
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('invalid');
    });
}

// Adiciona máscara ao campo de telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.substring(0, 3) + ')' + value.substring(3);
    }
    if (value.length > 4) {
        value = value.substring(0, 4) + value.substring(4);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5);
    }
    if (value.length > 10) {
        value = value.substring(0, 10) + '-' + value.substring(10);
    }
    
    e.target.value = value.substring(0, 14);
});