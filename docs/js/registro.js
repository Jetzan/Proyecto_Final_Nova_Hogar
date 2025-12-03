//Variables
let modalAbierto = false; // Variable para rastrear el estado del modal
let modalCarritoAbierto = false;

//Elementos del DOM

// Seleccionar el botón de iniciar sesión
const buttonIniciarSesion = document.getElementById("button--iniciar--sesion");

//Seleccionar el botón de cerrar modal iniciar sesión
const buttonCerrarModalIniciar = document.getElementById(
  "cerrar--modal--iniciar"
);

//Seleccionar el botón de carrito
const buttonCarrito = document.getElementById("button--carrito");

//Seleccionar el botón de cerrar modal carrito
const buttonCerrarModalCarrito = document.getElementById(
  "cerrar--modal--carrito"
);

//Seleccionar el modal de iniciar sesion del header
const modalIniciar = document.querySelector(".modal__iniciar");


//Seleccionar el modal de iniciar sesion de "Ya tienes cuenta..."
const buttonIniciarSesionRegistro = document.getElementById("button--iniciar--sesion--registro");

//Funciones

function mostrarModalIniciarSesion() {
  const modalIniciar = document.querySelector(".modal__iniciar");
  modalIniciar.style.display = "flex";
  console.log("Modal de iniciar sesión mostrado");
  modalAbierto = true;
}

//Mostrar modal carrito
function mostrarModalCarrito() {
  console.log("Botón de carrito presionado");
  const modalCarrito = document.querySelector(".modal__carrito");
  modalCarrito.style.display = "flex";
  console.log("Modal de carrito mostrado");
  modalCarritoAbierto = true;
}

function cerrarModalCarrito() {
  const modalCarrito = document.querySelector(".modal__carrito");
  modalCarrito.style.display = "none";
  console.log("Modal de carrito cerrado");
  modalCarritoAbierto = false;
}

function cerrarModalIniciarSesion() {
  modalIniciar.style.display = "none";
  modalAbierto = false;
  console.log("Modal de iniciar sesión cerrado");
}

//Eventos
buttonIniciarSesion.addEventListener("click", mostrarModalIniciarSesion);
buttonCerrarModalIniciar.addEventListener("click", cerrarModalIniciarSesion);

buttonCarrito.addEventListener("click", mostrarModalCarrito);
buttonCerrarModalCarrito.addEventListener("click", cerrarModalCarrito);


buttonIniciarSesionRegistro.addEventListener("click",mostrarModalIniciarSesion);


window.addEventListener("click", function (event) {
  if (modalAbierto) {
    if (
      event.target !== modalIniciar &&
      event.target !== buttonIniciarSesion &&
      !modalIniciar.contains(event.target) &&
      event.target !== buttonIniciarSesionRegistro
    ) {
      cerrarModalIniciarSesion();
    }
  }
});



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