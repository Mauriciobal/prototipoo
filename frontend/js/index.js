document.addEventListener('DOMContentLoaded', () => {
  // Si quieres simular una sesión, podrías guardar algo en localStorage aquí

  // Manejar formulario de login con validación local
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'prueba@gmail.com' && password === '1234') {
      window.location.href = '/prototipo/html/game.html';
    } else if (email === 'admin@gmail.com' && password === '1234') {
      window.location.href = '/prototipo/html/admin.html';
    } else {
      alert('Correo o contraseña incorrectos.\nPrueba con:\nprueba@gmail.com / 1234\nadmin@gmail.com / 1234');
    }
  });

  // Desactivar temporalmente los botones sociales
  document.getElementById('googleLogin').addEventListener('click', () => {
    alert('Login con Google aún no está disponible.');
  });

  document.getElementById('facebookLogin').addEventListener('click', () => {
    alert('Login con Facebook aún no está disponible.');
  });
});
