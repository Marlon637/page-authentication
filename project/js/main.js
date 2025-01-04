import { initializeCPFValidator } from './cpf-validator.js';
import { initializeFormHandlers, redirectToGoogle } from './form-handlers.js';

export function initializeForm() {
    initializeCPFValidator();
    initializeFormHandlers();
    
    // Make redirectToGoogle available globally for the button onclick handler
    window.formHandlers = {
        redirectToGoogle
    };
}