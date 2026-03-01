import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db } from '../js/config.js';

const tablaBody = document.getElementById('tabla-empleados');
const inputUser = document.getElementById('search-user');
const inputName = document.getElementById('search-name');
const btnSearch = document.getElementById('btn-search');

let todosLosEmpleados = []; // Cache local de datos

// 1. ESCUCHAR FIREBASE (Sincronización automática)
onSnapshot(collection(db, "empleados"), (snapshot) => {
    todosLosEmpleados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Al cargar por primera vez, mostramos todo
    renderizarTabla(todosLosEmpleados);
});

// 2. FUNCIÓN DE RENDERIZADO
function renderizarTabla(lista) {
    if (!tablaBody) return;
    tablaBody.innerHTML = '';

    if (lista.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-500">No se encontraron empleados que coincidan</td></tr>';
        return;
    }

    lista.forEach((emp) => {
        tablaBody.innerHTML += `
            <tr class="hover:bg-gray-100 border-b">
                <td class="py-3 px-4 text-center">${emp.email ? emp.email.split('@')[0] : 'ID'}</td>
                <td class="py-3 px-4 text-center">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Empleado</span>
                </td>
                <td class="py-3 px-4 text-center font-medium">${emp.nombre || "Sin nombre"}</td>
                <td class="py-3 px-4 text-center">${emp.puesto || emp.position || "Staff"}</td>
                <td class="py-3 px-4 text-center text-sm">${emp.fechaRegistro || "Reciente"}</td>
            </tr>
        `;
    });
}

// 3. LÓGICA DE FILTRADO (La "magia" de la búsqueda)
const ejecutarFiltro = () => {
    const queryUser = inputUser.value.toLowerCase().trim();
    const queryName = inputName.value.toLowerCase().trim();

    const filtrados = todosLosEmpleados.filter(emp => {
        // Buscamos coincidencia en email o en nombre
        const coincideUser = (emp.email || "").toLowerCase().includes(queryUser);
        const coincideNombre = (emp.nombre || "").toLowerCase().includes(queryName);
        
        return coincideUser && coincideNombre;
    });

    renderizarTabla(filtrados);
};

// 4. EVENTOS (Botón y Escritura en tiempo real)
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    ejecutarFiltro();
});

// Filtra mientras el usuario escribe (Input reactivo)
inputUser.addEventListener('input', ejecutarFiltro);
inputName.addEventListener('input', ejecutarFiltro);

// --- LÓGICA PARA PROYECTOS GLOBALES ---
const tablaProyectos = document.getElementById('tabla-proyectos-global');

onSnapshot(collection(db, "proyectos"), (snapshot) => {
    if (tablaProyectos) {
        tablaProyectos.innerHTML = '';
        
        if (snapshot.empty) {
            tablaProyectos.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-gray-500">No hay proyectos registrados</td></tr>';
            return;
        }

        snapshot.forEach((doc) => {
            const proyecto = doc.data();
            // Determinamos el color del badge según el estado
            const colorEstado = proyecto.estado === "Finalizado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";

            tablaProyectos.innerHTML += `
                <tr class="hover:bg-gray-100 border-b">
                    <td class="py-3 px-4 text-center font-medium">${proyecto.nombreProyecto || "S/N"}</td>
                    <td class="py-3 px-4 text-center">${proyecto.cliente || "Sin cliente"}</td>
                    <td class="py-3 px-4 text-center text-blue-600 underline">${proyecto.responsable || "No asignado"}</td>
                    <td class="py-3 px-4 text-center">
                        <span class="${colorEstado} text-xs px-2 py-1 rounded-full font-semibold">
                            ${proyecto.estado || "En proceso"}
                        </span>
                    </td>
                    <td class="py-3 px-4 text-center">${proyecto.fechaEntrega || "Pendiente"}</td>
                </tr>
            `;
        });
    }
});