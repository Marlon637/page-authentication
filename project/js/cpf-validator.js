document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros 3 dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os próximos 3 dígitos
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona traço antes dos últimos 2 dígitos
    e.target.value = value;
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (!validaCPF(cpf)) {
        e.preventDefault();
        document.getElementById('error-message').textContent = 'CPF inválido. Por favor, verifique.';
    }
});

function validaCPF(cpf) {
    if (cpf.length !== 11) return false;
    if (cpf === "00000000000") return false;
    
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}