const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userEmail', email); 

            if (data.role === 'admin') {
                window.location.href = "Administrador/admin.html";
            } else {
                window.location.href = "Empleado/empleados.html";
            }
        } else {
            alert(data.error || "Acceso denegado");
        }
    } catch (error) {
        alert("Error: El servidor no responde.");
    }
});