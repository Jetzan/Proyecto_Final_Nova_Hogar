//API 
const API = "https://backend-final-o904.onrender.com";

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




const formRegistro = document.getElementById("form--registro");

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById("input--nombre--registro").value.trim();
    const correo = document.getElementById("input--email--registro").value.trim();
    const pais   = document.getElementById("paises").value;
    const contra = document.getElementById("input--password--registro").value;
    const confirmar = document.getElementById("input--confirmar--password").value;

    // Validaciones básicas
    if (!nombre || !correo || !pais || !contra || !confirmar) {
        Swal.fire("Error", "Por favor completa todos los campos", "error");
        return;
    }

    if (contra !== confirmar) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
    }

    // Objeto para el backend
    const datos = { nombre, correo, contra, pais };

    // 1) Validar Captcha
    const token = grecaptcha.getResponse();
    if (!token) {
        Swal.fire("Error", "Por favor valida el captcha.", "error");
        return;
    }

    try {
        const res = await fetch(`${API}/api/auth/captcha`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recaptchaToken: token }) // NOMBRE IGUAL AL BACK
        });

        let data = {};
        try {
            data = await res.json();
        } catch (_) {}

        if (!res.ok) {
            console.error("Error HTTP en captcha:", res.status, data);
            Swal.fire("Error", data.responseDesc || "Error al validar el captcha", "error");
            grecaptcha.reset();
            return;
        }

        if (data.responseCode !== 0) {
            Swal.fire("Error", data.responseDesc || "Captcha inválido", "error");
            grecaptcha.reset();
            return;
        }
    } catch (err) {
        console.error("Error de conexión con captcha:", err);
        Swal.fire("Error", "No se pudo validar el captcha", "error");
        return;
    }

    // 2) Si el captcha fue correcto, registrar usuario
    try {
        const response = await fetch(`${API}/api/auth/newUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            Swal.fire("Error", data.mensaje || "Error al registrar usuario", "error");
            return;
        }

        Swal.fire("Éxito", "Usuario registrado exitosamente", "success");
        formRegistro.reset();
        grecaptcha.reset();
    } catch (error) {
        console.error("Error de conexión con el servidor:", error);
        Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
});



