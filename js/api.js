/**
 * api.js
 * Funciones para comunicarse con el backend API
 * @author Anthony
 * @date 2026-02-04
 */

// URL del backend API (cambiar después del deploy en Render)
const API_URL = 'http://localhost:8080/tasks.php'; // Local
// const API_URL = 'https://task-manager-api.onrender.com/api/tasks.php'; // Producción

/**
 * Obtener todas las tareas
 */
async function getAllTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener tareas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Obtener una tarea específica
 */
async function getTask(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener tarea');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Crear nueva tarea
 */
async function createTask(taskData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear tarea');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Actualizar tarea
 */
async function updateTask(taskData) {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar tarea');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Eliminar tarea
 */
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar tarea');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
