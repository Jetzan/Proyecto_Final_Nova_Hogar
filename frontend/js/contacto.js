//Variables

//Elementos del DOM
const formularioContacto = document.getElementById("form--contacto");

//Funciones
function enviarFormularioContacto(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  const nombre = document.getElementById("input--nombre--contacto").value;
  const email = document.getElementById("input--email--contacto").value;
  const mensaje = document.getElementById("input--mensaje--contacto").value;

  const datosContacto = {
    nombre: nombre,
    email: email,
    mensaje: mensaje,
  };

  console.log("Datos de contacto enviados:", datosContacto);

  // Mostrar alerta de éxito usando SweetAlert2
  Swal.fire({
    icon: "success",
    title: "Mensaje enviado",
    text: "Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarnos!",
    confirmButtonText: "Aceptar",
  });
}

//Eventos
    
formularioContacto.addEventListener("submit", enviarFormularioContacto);
