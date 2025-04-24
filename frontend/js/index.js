document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = window.location.origin.replace('5500', '2025');

    // Cambiar entre login y registro
    document.getElementById('showRegister')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('registerContainer').style.display = 'block';
    });

    document.getElementById('cancelRegister')?.addEventListener('click', () => {
        document.getElementById('registerContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';
    });

    // Login
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                alert(`Bienvenido ${data.user.NombreUsuario}`);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                window.location.href = 'game.html'; // Modifica si quieres redirigir a otro lado
            } else {
                alert(data.message || 'Error en el login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo conectar al servidor');
        }
    });

    // Registro
    document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    NombreUsuario: username,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión');
                document.getElementById('registerForm').reset();
                document.getElementById('registerContainer').style.display = 'none';
                document.getElementById('loginContainer').style.display = 'block';
            } else {
                alert(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo conectar al servidor');
        }
    });

    document.getElementById('googleLogin')?.addEventListener('click', () => {
        alert('Login con Google no disponible aún');
    });

    document.getElementById('facebookLogin')?.addEventListener('click', () => {
        alert('Login con Facebook no disponible aún');
    });
});
