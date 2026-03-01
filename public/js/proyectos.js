const BASE_URL = "http://localhost:3000/api";

// 1. CARGAR EMPLEADOS EN EL SELECTOR
async function cargarEmpleados() {
    const selector = document.getElementById('integrantes');
    if (!selector) return;

    try {
        const response = await fetch(`${BASE_URL}/empleados`);
        const empleados = await response.json();

        selector.innerHTML = '<option value="">Selecciona un responsable...</option>';
        empleados.forEach(emp => {
            const option = document.createElement('option');
            // GUARDAMOS EL EMAIL como valor oculto para la vinculación
            option.value = emp.email; 
            option.textContent = `${emp.nombre} (${emp.email})`;
            selector.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar empleados:", error);
    }
}

// 2. REGISTRAR EL PROYECTO (Envío al Backend)
async function crearProyecto(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('token');

    const datosProyecto = {
        nombreProyecto: document.getElementById('nombreProyecto').value,
        cliente: document.getElementById('cliente').value,
        responsable: document.getElementById('integrantes').value, // Esto envía el EMAIL seleccionado
        fechaEntrega: document.getElementById('fechaEntrega').value,
        estado: document.getElementById('estado').value,
        descripcion: document.getElementById('nombreProyecto').value // Usamos el nombre como desc temporal o añade el ID
    };

    try {
        const response = await fetch(`${BASE_URL}/proyectos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosProyecto)
        });

        if (response.ok) {
            alert("✅ Proyecto registrado y asignado correctamente");
            window.location.href = "admin.html";
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "No se pudo registrar."));
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Asegúrate de que tu servidor Node.js esté corriendo.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarEmpleados();
    const form = document.getElementById('form-proyecto');
    if (form) form.addEventListener('submit', crearProyecto);
});