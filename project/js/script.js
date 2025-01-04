document.addEventListener('DOMContentLoaded', function() {
    const openTermsModal = document.getElementById('openTermsModal');
    const closeTermsModal = document.getElementById('closeTermsModal');
    const termsModal = document.getElementById('termsModal');

    openTermsModal.addEventListener('click', function(event) {
        event.preventDefault();
        termsModal.style.display = 'block';
    });

    closeTermsModal.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == termsModal) {
            termsModal.style.display = 'none';
        }
    });

    // Mostrar botão de cadastro apenas se os termos forem aceitos
    const acceptTermsCheckbox = document.getElementById('acceptTermsCheckbox');
    const submitButton = document.getElementById('submitButton');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');

    function validateEmail(email) {
        const genericEmails = ['teste@teste', '123@teste'];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) && !genericEmails.includes(email.toLowerCase());
    }

    function validateForm() {
        const isEmailValid = validateEmail(emailInput.value);
        if (nomeInput.value && isEmailValid && cpfInput.value) {
            acceptTermsCheckbox.disabled = false;
        } else {
            acceptTermsCheckbox.disabled = true;
            submitButton.style.display = 'none';
        }
    }

    nomeInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    cpfInput.addEventListener('input', validateForm);

    acceptTermsCheckbox.addEventListener('change', function() {
        submitButton.style.display = this.checked ? 'block' : 'none';
    });

    // Formatar CPF
    cpfInput.addEventListener('input', function() {
        let value = cpfInput.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        cpfInput.value = value;
    });
});