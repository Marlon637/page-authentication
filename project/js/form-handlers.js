// Form submission and popup handling
export function initializeFormHandlers() {
    const form = document.getElementById('cadastroForm');
    const termsCheckbox = document.getElementById('acceptTermsCheckbox');
    const submitButton = document.getElementById('submitButton');

    if (termsCheckbox && submitButton) {
        // Set initial state
        submitButton.style.display = termsCheckbox.checked ? 'block' : 'none';
        
        // Add change listener
        termsCheckbox.addEventListener('change', () => {
            submitButton.style.display = termsCheckbox.checked ? 'block' : 'none';
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessPopup();
        });
    }
}

export function showSuccessPopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('successPopup');
    
    if (overlay && popup) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }
}

export function redirectToGoogle() {
    window.location.href = 'https://www.google.com.br';
}