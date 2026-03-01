import { collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db } from '../js/config.js';

const userEmail = localStorage.getItem('userEmail');

if (!userEmail) {
    window.location.href = "../index.html"; 
} else {
    cargarDashboard();
}

function cargarDashboard() {
    // 1. INFO PERSONAL DEL PERFIL
    const qUser = query(collection(db, "empleados"), where("email", "==", userEmail));
    onSnapshot(qUser, (snapshot) => {
        if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            document.getElementById('nombre-empleado').innerText = data.nombre || "Usuario";
            document.getElementById('puesto-empleado').innerText = data.puesto || "N/A";
            document.getElementById('depto-empleado').innerText = data.departamento || "General";
        }
    });

    // 2. PROYECTOS PRIVADOS (Filtro por correo del responsable)
    const qProyectos = query(collection(db, "proyectos"), where("responsable", "==", userEmail));
    const tabla = document.getElementById('tabla-proyectos');

    onSnapshot(qProyectos, (snapshot) => {
        if (tabla) {
            tabla.innerHTML = '';
            if (snapshot.empty) {
                tabla.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-gray-500">No tienes proyectos asignados actualmente.</td></tr>';
                return;
            }
            snapshot.forEach((doc) => {
                const p = doc.data();
                const badgeColor = p.estado === "Finalizado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
                
                tabla.innerHTML += `
                    <tr class="hover:bg-gray-50 border-b text-center transition-colors">
                        <td class="py-3 px-4 font-bold text-gray-800">${p.nombreProyecto || "S/N"}</td>
                        <td class="py-3 px-4 text-gray-600">${p.cliente || "Interno"}</td>
                        <td class="py-3 px-4">
                            <span class="${badgeColor} text-xs px-2 py-1 rounded-full font-semibold uppercase">
                                ${p.estado || "Activo"}
                            </span>
                        </td>
                        <td class="py-3 px-4 text-gray-600">${p.fechaEntrega || "Pendiente"}</td>
                    </tr>
                `;
            });
        }
    });
}