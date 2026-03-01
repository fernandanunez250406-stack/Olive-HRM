import { db } from './js/config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Buscamos el formulario por la etiqueta <form> ya que no tiene ID
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Extraemos los datos usando los IDs que ya tienes en tu HTML
    const nombre = document.getElementById('name').value;
    const edad = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const puesto = document.getElementById('position').value;
    const departamento = document.getElementById('department').value;

    try {
        // Guardamos en una colección llamada "empleados"
        const docRef = await addDoc(collection(db, "empleados"), {
            nombre: nombre,
            edad: edad,
            email: email,
            puesto: puesto,
            departamento: departamento,
            fechaRegistro: new Date().toLocaleDateString()
        });

        alert("¡Empleado guardado con éxito! ID: " + docRef.id);
        form.reset(); // Limpia los campos
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Hubo un fallo al conectar con Firebase.");
    }
});