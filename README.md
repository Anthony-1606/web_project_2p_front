# 🟦 Task Manager - Frontend

Interfaz de usuario para el sistema de gestión de tareas. Aplicación web desarrollada con HTML, CSS y JavaScript vanilla.

## 📋 Tecnologías

- HTML5
- CSS3 (Flexbox, Grid, Variables CSS)
- JavaScript ES6+ (Fetch API, Async/Await)
- Font Awesome 6.4

## 📁 Estructura

```
task-manager-frontend/
├── index.html          # Página principal
├── create.html         # Formulario crear
├── edit.html          # Formulario editar
├── css/
│   └── style.css
├── js/
│   ├── api.js         # Comunicación con backend
│   ├── app.js         # Lógica principal
│   └── validation.js  # Validaciones
├── _redirects         # Config Netlify
└── netlify.toml       # Config Netlify
```

## ✨ Características

- ✅ CRUD completo de tareas
- ✅ Dashboard con estadísticas
- ✅ Validaciones frontend y backend
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna con gradientes
- ✅ Sistema de alertas
- ✅ Loading states

## 🎨 Diseño

- Paleta de colores moderna (púrpura/azul)
- Tipografía: Segoe UI
- Iconografía: Font Awesome
- Animaciones CSS
- Grid de tarjetas responsive

## 🔧 Configuración

### Desarrollo Local

1. **Configurar URL del backend** en `js/api.js`:
   ```javascript
   const API_URL = 'http://localhost:8080/tasks.php';
   ```

2. **Abrir con Live Server** o cualquier servidor local

### Producción

1. **Actualizar URL** en `js/api.js`:
   ```javascript
   const API_URL = 'https://tu-backend.onrender.com/api/tasks.php';
   ```

2. **Deploy en Netlify**:
   - Conectar repositorio
   - Build settings: ninguno necesario
   - Publish directory: `.` (raíz)

## 🚀 Deploy en Netlify

1. Push a GitHub
2. Ir a https://netlify.com
3. "New site from Git"
4. Conectar repositorio
5. Deploy automático

## 📱 Responsive

- **Móvil** (< 480px): Layout de 1 columna
- **Tablet** (480px - 768px): Layout de 2 columnas
- **Desktop** (> 768px): Layout de 3 columnas

## 🎯 Páginas

### index.html
- Lista de todas las tareas
- Tarjetas con información
- Estadísticas (pendientes, en proceso, completadas)
- Botones de editar y eliminar

### create.html
- Formulario de creación
- Validaciones en tiempo real
- Campos: título, descripción, estado, prioridad, fecha

### edit.html
- Formulario de edición
- Carga datos existentes
- Mismas validaciones que create

## 📝 Autor

Anthony - Ingeniería en Software

## 📄 Licencia

Uso académico
