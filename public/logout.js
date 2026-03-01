import { auth } from './js/config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const btnLogout = document.getElementById('btn-logout');

if (btnLogout) {
    btnLogout.addEventListener('click', async (e) => {
        e.preventDefault(); // ESTO evita que te saque al login por error
        try {
            await signOut(auth);
            localStorage.clear(); 
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Error al salir:", error);
        }
    });
}