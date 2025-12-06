// API 
const API = "https://backend-final-o904.onrender.com";

// Variables
let modalAbierto = false; // Estado del modal de iniciar sesión
let modalCarritoAbierto = false; // Estado del modal de carrito

// Elementos del DOM

const buttonIniciarSesion = document.getElementById("button--iniciar--sesion");
const buttonCerrarModalIniciar = document.getElementById("cerrar--modal--iniciar");

const buttonCarrito = document.getElementById("button--carrito");
const buttonCerrarModalCarrito = document.getElementById("cerrar--modal--carrito");

const modalIniciar = document.querySelector(".modal__iniciar");
const modalCarrito = document.querySelector(".modal__carrito");

// Botón "Ya tienes cuenta... iniciar sesión" del registro
const buttonIniciarSesionRegistro = document.getElementById("button--iniciar--sesion--registro");

// =======================
// Funciones MODALES
// =======================

function mostrarModalIniciarSesion() {
  if (!modalIniciar) return;
  modalIniciar.style.display = "flex";
  console.log("Modal de iniciar sesión mostrado");
  modalAbierto = true;
}

function cerrarModalIniciarSesion() {
  if (!modalIniciar) return;
  modalIniciar.style.display = "none";
  modalAbierto = false;
  console.log("Modal de iniciar sesión cerrado");
}

function mostrarModalCarrito() {
  if (!modalCarrito) return;
  console.log("Botón de carrito presionado");
  modalCarrito.style.display = "flex";
  console.log("Modal de carrito mostrado");
  modalCarritoAbierto = true;
}

function cerrarModalCarrito() {
  if (!modalCarrito) return;
  modalCarrito.style.display = "none";
  console.log("Modal de carrito cerrado");
  modalCarritoAbierto = false;
}

// =======================
// Eventos MODALES
// =======================

// Abrir / cerrar modal iniciar sesión (header)
if (buttonIniciarSesion && modalIniciar) {
  buttonIniciarSesion.addEventListener("click", mostrarModalIniciarSesion);
}

if (buttonCerrarModalIniciar && modalIniciar) {
  buttonCerrarModalIniciar.addEventListener("click", cerrarModalIniciarSesion);
}

// Abrir / cerrar modal carrito
if (buttonCarrito && modalCarrito) {
  buttonCarrito.addEventListener("click", mostrarModalCarrito);
}

if (buttonCerrarModalCarrito && modalCarrito) {
  buttonCerrarModalCarrito.addEventListener("click", cerrarModalCarrito);
}

// Botón "Ya tienes cuenta? Inicia sesión" en el registro
if (buttonIniciarSesionRegistro && modalIniciar) {
  buttonIniciarSesionRegistro.addEventListener("click", mostrarModalIniciarSesion);
}

// Cerrar modales al hacer clic fuera
window.addEventListener("click", function (event) {
  // Cerrar modal de iniciar sesión
  if (modalAbierto && modalIniciar) {
    if (
      event.target !== modalIniciar &&
      !modalIniciar.contains(event.target) &&
      event.target !== buttonIniciarSesion &&
      event.target !== buttonIniciarSesionRegistro
    ) {
      cerrarModalIniciarSesion();
    }
  }

  // Cerrar modal de carrito
  if (modalCarritoAbierto && modalCarrito) {
    if (
      event.target !== modalCarrito &&
      !modalCarrito.contains(event.target) &&
      event.target !== buttonCarrito
    ) {
      cerrarModalCarrito();
    }
  }
});

// =======================
// Países para el select
// =======================

const selectPaises = document.getElementById("paises");

const obtenerPaises = async () => {
  if (!selectPaises) return;

  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all?fields=name");
    if (!respuesta.ok) throw new Error("Error en la respuesta");
    const datos = await respuesta.json();
    const nombres = datos.map((p) => p.name.common).sort();

    nombres.forEach((nombrePais) => {
      const opcion = document.createElement("option");
      opcion.value = nombrePais;
      opcion.textContent = nombrePais;
      selectPaises.appendChild(opcion);
    });
  } catch (error) {
    console.error("% Error al obtener los países:", error);
  }
};

// Llamar a la función para obtener y mostrar los países al cargar la página
obtenerPaises();

// =======================
// Registro de usuario
// =======================

const formRegistro = document.getElementById("form--registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById("input--nombre--registro")?.value.trim();
    const correo = document.getElementById("input--email--registro")?.value.trim();
    const pais = document.getElementById("paises")?.value;
    const contra = document.getElementById("input--password--registro")?.value;
    const confirmar = document.getElementById("input--confirmar--password")?.value;

    // Validaciones básicas
    if (!nombre || !correo || !pais || !contra || !confirmar) {
      Swal.fire("Error", "Por favor completa todos los campos", "error");
      return;
    }

    if (contra !== confirmar) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    const password = contra;

    // Objeto para el backend
    const datos = { nombre, correo, password, pais, cliente: "cliente" };

    // 1) Captcha (actualmente comentado)
    // const token = grecaptcha.getResponse();
    // if (!token) {
    //   Swal.fire("Error", "Por favor valida el captcha.", "error");
    //   return;
    // }

    // try {
    //   const res = await fetch(`${API}/api/auth/captcha`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ recaptchaToken: token }) // NOMBRE IGUAL AL BACK
    //   });

    //   let data = {};
    //   try {
    //     data = await res.json();
    //   } catch (_) {}

    //   if (!res.ok) {
    //     console.error("Error HTTP en captcha:", res.status, data);
    //     Swal.fire("Error", data.responseDesc || "Error al validar el captcha", "error");
    //     grecaptcha.reset();
    //     return;
    //   }

    //   if (data.responseCode !== 0) {
    //     Swal.fire("Error", data.responseDesc || "Captcha inválido", "error");
    //     grecaptcha.reset();
    //     return;
    //   }
    // } catch (err) {
    //   console.error("Error de conexión con captcha:", err);
    //   Swal.fire("Error", "No se pudo validar el captcha", "error");
    //   return;
    // }

    // 2) Registrar usuario
    try {
      const response = await fetch(`${API}/api/auth/newUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire("Error", data.mensaje || "Error al registrar usuario", "error");
        return;
      }

      Swal.fire("Éxito", "Usuario registrado exitosamente", "success");
      formRegistro.reset();
      // grecaptcha.reset();
    } catch (error) {
      console.error("Error de conexión con el servidor:", error);
      Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
  });
}
