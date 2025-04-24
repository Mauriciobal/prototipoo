document.addEventListener('DOMContentLoaded', () => {
  // 1. Cambiar entre login y registro
  document.getElementById('showRegister')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('loginContainer').style.display = 'none';
      document.getElementById('registerContainer').style.display = 'block';
  });

  document.getElementById('cancelRegister')?.addEventListener('click', () => {
      document.getElementById('registerContainer').style.display = 'none';
      document.getElementById('loginContainer').style.display = 'block';
  });

  // 2. Manejar LOGIN real
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch('http://localhost:2025/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (data.success) {
              alert(`Bienvenido ${data.user.NombreUsuario}`);
              // Guardar usuario en localStorage
              localStorage.setItem('currentUser', JSON.stringify(data.user));
              // Redirigir a la página principal
              window.location.href = 'game.html'; // Cambia esto por tu página
          } else {
              alert(data.message || 'Error en el login');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('No se pudo conectar al servidor');
      }
  });

  // 3. Manejar REGISTRO real
  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      try {
          const response = await fetch('http://localhost:2025/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: email,
                  NombreUsuario: username,
                  password: password
              })
          });

          const data = await response.json();

          if (data.success) {
              alert('¡Registro exitoso! Ahora puedes iniciar sesión');
              // Limpiar y mostrar login
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

  // (Opcional) Botones sociales - puedes dejarlos inactivos
  document.getElementById('googleLogin')?.addEventListener('click', () => {
      alert('Login con Google no disponible aún');
  });

  document.getElementById('facebookLogin')?.addEventListener('click', () => {
      alert('Login con Facebook no disponible aún');
  });
});