const patrones = {
  nombre: /^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ\s]{2,60}$/,
  boleta: /^\d{10}$/
};

const mensajes = {
  nombre: "Solo letras y espacios, entre 2 y 60 caracteres.",
  boleta: "Debe tener exactamente 10 dígitos."
};

function validarCampo(campo, valor) {
  if (!patrones[campo]) return true;
  return patrones[campo].test(valor.trim());
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formAsistencia');
  const mensajeContainer = document.getElementById('mensajeConfirmacion');
  const contador = document.getElementById('contador');

  if (form) {
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const inputNombre = document.getElementById('nombre');
      const inputBoleta = document.getElementById('boleta');

      const esNombreValido = validarCampo('nombre', inputNombre.value);
      const esBoletaValido = validarCampo('boleta', inputBoleta.value);

      if (!esNombreValido || !esBoletaValido) {
        let mensajeError = '';
        if (!esNombreValido) mensajeError += mensajes.nombre + ' ';
        if (!esBoletaValido) mensajeError += mensajes.boleta;

        mensajeContainer.innerHTML = `<p class="mensaje-error" style="color: #ef4444; font-size: 14px; margin-top: 10px;">${mensajeError}</p>`;
        return;
      }

      mensajeContainer.innerHTML = '<p class="mensaje-exito" style="color: #10b981; font-weight: bold; margin-top: 10px;">Asistencia registrada correctamente</p>';

      if (contador) {
        let actual = Number(contador.textContent);
        contador.textContent = actual + 1;
      }

      form.reset();
    });
  }
});