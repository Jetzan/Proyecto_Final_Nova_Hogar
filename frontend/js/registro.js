//Variables
let modalAbierto = false; // Variable para rastrear el estado del modal

//Elementos del DOM
const buttonInicarSesionRegistro = document.getElementById(
  "button--iniciar--sesion--registro"
);

const formularioRegistro = document.getElementById("form--registro");

//Funcionaes
function mostrarModalIniciarSesion() {
  const modalIniciar = document.querySelector(".modal__iniciar");
  modalIniciar.style.display = "flex";
  console.log("Modal de iniciar sesión mostrado");
  modalAbierto = true;
}

function enviarFormularioRegistro(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  const nombre = document.getElementById("input--nombre--registro").value;
  const email = document.getElementById("input--email--registro").value;
  const password = document.getElementById("input--password--registro").value;
  const confirmarPassword = document.getElementById(
    "input--confirmar--password"
  ).value;
  const pais = document.getElementById("paises").value;

  // Validar que las contraseñas coincidan
  if (password !== confirmarPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Guardar los datos en un objeto
  const datosRegistro = {
    nombre: nombre,
    email: email,
    password: password,
    pais: pais,
  };

  console.log("Datos de registro enviados:", datosRegistro);

  // Mostrar alerta de éxito usando SweetAlert2
  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Tu cuenta ha sido creada correctamente",
    confirmButtonText: "Aceptar",
  });
}

//Eventos
// Mostrar el modal de iniciar sesión desde la página de registro
buttonInicarSesionRegistro.addEventListener("click", mostrarModalIniciarSesion);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener("click", function (event) {
  const modalIniciar = document.querySelector(".modal__iniciar");
  if (modalAbierto) {
    if (
      event.target !== modalIniciar &&
      event.target !== buttonInicarSesionRegistro &&
      !modalIniciar.contains(event.target)
    ) {
      modalIniciar.style.display = "none";
      modalAbierto = false;
      console.log("Modal de iniciar sesión cerrado");
    }
  }
});

formularioRegistro.addEventListener("submit", enviarFormularioRegistro);

//Codigo que se ejecuta al cargar la pagina

// Código para obtener y mostrar la lista de países en el select
const obtenerPaises = async () => {
  try {
    const respuesta = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    if (!respuesta.ok) throw new Error("Error en la respuesta");
    const datos = await respuesta.json();
    const nombres = datos.map((p) => p.name.common).sort();
    nombres.forEach((nombrePais) => {
      const opcion = document.createElement("option");
      opcion.value = nombrePais;
      opcion.textContent = nombrePais;
      document.getElementById("paises").appendChild(opcion);
    });
  } catch (error) {
    console.error("% Error al obtener los países:", error);
  }
};

// Llamar a la función para obtener y mostrar los países al cargar la página
obtenerPaises();
