/**
 * validation.js
 * Validaciones del lado del cliente
 * @author Anthony
 * @date 2026-02-04
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener el formulario de tareas
    const taskForm = document.getElementById('taskForm');
    
    if (taskForm) {
        // Agregar evento de validación al submit
        taskForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault(); // Prevenir envío si hay errores
            }
        });
        
        // Validación en tiempo real del título
        const titleInput = document.getElementById('title');
        if (titleInput) {
            titleInput.addEventListener('input', function() {
                validateTitle();
            });
        }
        
        // Validación en tiempo real de la fecha
        const dueDateInput = document.getElementById('due_date');
        if (dueDateInput) {
            dueDateInput.addEventListener('change', function() {
                validateDate();
            });
        }
    }
    
    // Auto-cerrar alertas después de 5 segundos
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
});

/**
 * Validar formulario completo
 * @returns {boolean} True si el formulario es válido
 */
function validateForm() {
    let isValid = true;
    
    // Validar título
    if (!validateTitle()) {
        isValid = false;
    }
    
    // Validar fecha
    if (!validateDate()) {
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validar campo título
 * @returns {boolean} True si el título es válido
 */
function validateTitle() {
    const titleInput = document.getElementById('title');
    const titleValue = titleInput.value.trim();
    
    // Remover mensaje de error anterior
    removeError(titleInput);
    
    // Validar que no esté vacío
    if (titleValue === '') {
        showError(titleInput, 'El título es obligatorio');
        return false;
    }
    
    // Validar longitud máxima
    if (titleValue.length > 100) {
        showError(titleInput, 'El título no puede exceder 100 caracteres');
        return false;
    }
    
    // Validar longitud mínima
    if (titleValue.length < 3) {
        showError(titleInput, 'El título debe tener al menos 3 caracteres');
        return false;
    }
    
    return true;
}

/**
 * Validar campo fecha
 * @returns {boolean} True si la fecha es válida
 */
function validateDate() {
    const dueDateInput = document.getElementById('due_date');
    const dueDateValue = dueDateInput.value;
    
    // Remover mensaje de error anterior
    removeError(dueDateInput);
    
    // La fecha es opcional, si está vacía es válida
    if (dueDateValue === '') {
        return true;
    }
    
    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dueDateValue)) {
        showError(dueDateInput, 'Formato de fecha inválido');
        return false;
    }
    
    // Validar que la fecha no sea en el pasado
    const selectedDate = new Date(dueDateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError(dueDateInput, 'La fecha no puede ser en el pasado');
        return false;
    }
    
    return true;
}

/**
 * Mostrar mensaje de error
 * @param {HTMLElement} input Campo de entrada
 * @param {string} message Mensaje de error
 */
function showError(input, message) {
    // Agregar clase de error al input
    input.classList.add('error-input');
    
    // Crear elemento de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Insertar mensaje después del input
    input.parentElement.appendChild(errorDiv);
    
    // Agregar estilos dinámicos si no existen
    if (!document.getElementById('validation-styles')) {
        const style = document.createElement('style');
        style.id = 'validation-styles';
        style.innerHTML = `
            .error-input {
                border-color: #EF4444 !important;
                background-color: #FEE2E2;
            }
            
            .error-message {
                color: #991B1B;
                font-size: 0.85rem;
                margin-top: 0.25rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-5px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Remover mensaje de error
 * @param {HTMLElement} input Campo de entrada
 */
function removeError(input) {
    input.classList.remove('error-input');
    
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Confirmar eliminación de tarea
 * @param {string} taskTitle Título de la tarea
 * @returns {boolean} True si el usuario confirma
 */
function confirmDelete(taskTitle) {
    return confirm(`¿Estás seguro de eliminar la tarea "${taskTitle}"?\n\nEsta acción no se puede deshacer.`);
}

/**
 * Limpiar formulario
 */
function clearForm() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.reset();
        
        // Remover todos los mensajes de error
        const inputs = taskForm.querySelectorAll('.error-input');
        inputs.forEach(input => {
            removeError(input);
        });
    }
}

/**
 * Mostrar contador de caracteres para el título
 */
const titleInput = document.getElementById('title');
if (titleInput) {
    titleInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 100;
        
        // Buscar o crear contador
        let counter = this.parentElement.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('span');
            counter.className = 'char-counter';
            counter.style.cssText = 'font-size: 0.85rem; color: #6B7280; float: right;';
            
            const hint = this.parentElement.querySelector('.form-hint');
            if (hint) {
                hint.appendChild(counter);
            }
        }
        
        counter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength) {
            counter.style.color = '#EF4444';
        } else if (currentLength > maxLength * 0.9) {
            counter.style.color = '#F59E0B';
        } else {
            counter.style.color = '#6B7280';
        }
    });
}

// Log para debugging
console.log('Task Manager - Validaciones cargadas correctamente');
