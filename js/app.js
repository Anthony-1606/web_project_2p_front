/**
 * app.js
 * Lógica principal para index.html
 * @author Anthony
 * @date 2026-02-04
 */

// Cargar tareas al inicio
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

/**
 * Cargar y mostrar todas las tareas
 */
async function loadTasks() {
    const loading = document.getElementById('loading');
    const tasksContainer = document.getElementById('tasks-container');
    const emptyState = document.getElementById('empty-state');
    
    loading.style.display = 'block';
    tasksContainer.innerHTML = '';
    emptyState.style.display = 'none';
    
    try {
        const data = await getAllTasks();
        const tasks = data.tasks;
        const stats = data.stats;
        
        // Actualizar estadísticas
        document.getElementById('stat-pendientes').textContent = stats.pendientes || 0;
        document.getElementById('stat-proceso').textContent = stats.en_proceso || 0;
        document.getElementById('stat-completadas').textContent = stats.completadas || 0;
        
        loading.style.display = 'none';
        
        if (tasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            displayTasks(tasks);
        }
        
    } catch (error) {
        loading.style.display = 'none';
        showAlert('Error al cargar las tareas. Verifica tu conexión.', 'error');
    }
}

/**
 * Mostrar tareas en el DOM
 */
function displayTasks(tasks) {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '<div class="tasks-grid"></div>';
    const tasksGrid = tasksContainer.querySelector('.tasks-grid');
    
    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        tasksGrid.appendChild(taskCard);
    });
}

/**
 * Crear tarjeta de tarea
 */
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card task-${task.status}`;
    
    // Icono y texto de prioridad
    const priorityIcons = {
        'alta': '<i class="fas fa-arrow-up"></i> Alta',
        'media': '<i class="fas fa-minus"></i> Media',
        'baja': '<i class="fas fa-arrow-down"></i> Baja'
    };
    
    // Icono y texto de estado
    const statusIcons = {
        'pendiente': '<i class="fas fa-clock"></i> Pendiente',
        'en_proceso': '<i class="fas fa-spinner"></i> En Proceso',
        'completada': '<i class="fas fa-check"></i> Completada'
    };
    
    // Formatear fecha
    let dateHTML = '';
    if (task.due_date) {
        const dueDate = new Date(task.due_date);
        const today = new Date();
        const isOverdue = dueDate < today && task.status !== 'completada';
        
        dateHTML = `
            <span class="due-date">
                <i class="fas fa-calendar"></i>
                ${isOverdue ? '<span class="overdue">Vencida</span>' : formatDate(dueDate)}
            </span>
        `;
    }
    
    card.innerHTML = `
        <div class="task-header">
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
            <span class="priority-badge priority-${task.priority}">
                ${priorityIcons[task.priority]}
            </span>
        </div>
        
        ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
        
        <div class="task-meta">
            <span class="status-badge status-${task.status}">
                ${statusIcons[task.status]}
            </span>
            ${dateHTML}
        </div>
        
        <div class="task-actions">
            <a href="edit.html?id=${task.id}" class="btn btn-secondary">
                <i class="fas fa-edit"></i> Editar
            </a>
            <button onclick="confirmDelete(${task.id})" class="btn btn-danger">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;
    
    return card;
}

/**
 * Confirmar y eliminar tarea
 */
async function confirmDelete(id) {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
        return;
    }
    
    try {
        const result = await deleteTask(id);
        
        if (result.success) {
            showAlert('Tarea eliminada exitosamente', 'success');
            loadTasks(); // Recargar lista
        } else {
            showAlert('Error al eliminar la tarea', 'error');
        }
    } catch (error) {
        showAlert('Error de conexión con el servidor', 'error');
    }
}

/**
 * Mostrar alerta
 */
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    alertContainer.innerHTML = `
        <div class="alert ${alertClass}">
            <i class="fas ${icon}"></i> ${message}
        </div>
    `;
    
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

/**
 * Formatear fecha
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Escapar HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
