//Variables
let modalCarritoAbierto = false;
let modalAccesibilidadAbierto = false;
let cuentaLogeada = false;

const API_URL = "https://backend-final-o904.onrender.com/api";

//Elementos del DOM

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

//Mostrar modal carrito
function mostrarModalCarrito() {
  if (!cuentaLogeada) {
    Swal.fire({
      icon: "warning",
      title: "¡Atención!",
      text: "Debes iniciar sesión para ver tu carrito",
      confirmButtonText: "Aceptar",
    });
    return;
  }

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

buttonCarrito.addEventListener("click", mostrarModalCarrito);
buttonCerrarModalCarrito.addEventListener("click", cerrarModalCarrito);

const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const colorFondo = getComputedStyle(document.documentElement)
    .getPropertyValue("--fondo-main")
    .trim();

  console.log(colorFondo);
  if (colorFondo == "#E6DED4") {
    document.documentElement.style.setProperty("--fondo-main", "#26221F");
  } else {
    document.documentElement.style.setProperty("--fondo-main", "#E6DED4");
  }
});

// Mostrar/ocultar menú
const menu = document.getElementById("accessibilityMenu");
const button = document.getElementById("button--accesibilidad");

const slider = document.querySelector(".accessibility__slider");

let valorAntes = 1;
let valorDespues = 1;

slider.addEventListener("input", () => {
  const scale = slider.value;
  document.querySelector(".accessibility--example").style.fontSize =
    "calc(1rem + " + scale * 2 + "px)";
  valorDespues = scale;
});

const buttonCerrarAccesbilidad = document.getElementById(
  "cerrar--accesibilidad"
);

function cerrarAccesbilidad() {
  if (modalAccesibilidadAbierto) {
    if (valorAntes != valorDespues) {
      valorAntes = valorDespues;
      document.documentElement.style.fontSize =
        "calc(1rem + " + valorAntes * 2 + "px)";
    }
    menu.style.display = "none";
    modalAccesibilidadAbierto = false;
  } else {
  }
}

buttonCerrarAccesbilidad.addEventListener("click", cerrarAccesbilidad);

button.addEventListener("click", () => {
  if (modalAccesibilidadAbierto) {
  } else {
    menu.style.display = "flex";
    modalAccesibilidadAbierto = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnAbrirLogin = document.getElementById("button--iniciar--sesion");
  const modalLogin = document.querySelector(".modal__iniciar");
  const btnCerrarModalLogin = document.getElementById("cerrar--modal--iniciar");
  const formLogin = document.querySelector(".modal--form");

  const contenedorLoged = document.querySelector(".user--loged");
  const textoNombre = document.querySelector(".nombre--user");
  const btnCerrarSesion = document.querySelector(".button--cerrar--sesion");
  const btnPanelAdmin = document.querySelector(
    ".user--loged a[href='panel-admin.html']"
  );

  /* ---------------------------
       FUNCIONES PARA LA SESIÓN
    ---------------------------- */

  function mostrarSesion(userData) {
    // Ocultar "Iniciar sesión"
    btnAbrirLogin.style.display = "none";

    // Mostrar contenedor logeado
    contenedorLoged.style.display = "flex";

    // Nombre
    textoNombre.textContent = userData.nombre;

    // Mostrar botón admin solo si rol = admin
    if (userData.rol === "admin") {
      btnPanelAdmin.style.display = "block";
    } else {
      btnPanelAdmin.style.display = "none";
    }
  }

  function ocultarSesion() {
    btnAbrirLogin.style.display = "block";
    contenedorLoged.style.display = "none";
  }

  /* ---------------------------------------------------------
        ✔ REVISAR SESIÓN AL CARGAR LA PÁGINA (LO QUE FALTABA)
    ---------------------------------------------------------- */

  function revisarSesionGuardada() {
    const sesion = localStorage.getItem("usuario");

    if (sesion) {
      const userData = JSON.parse(sesion);
      mostrarSesion(userData);
      cuentaLogeada = true; // ← IMPORTANTE
    } else {
      ocultarSesion();
    }
  }

  revisarSesionGuardada(); // ← IMPORTANTE

  /* ---------------------
       ABRIR/CERRAR MODAL
    ---------------------- */
  btnAbrirLogin.addEventListener("click", () => {
    modalLogin.style.display = "flex";
  });

  btnCerrarModalLogin.addEventListener("click", () => {
    modalLogin.style.display = "none";
  });

  /* ---------------------
   ENVÍO DEL LOGIN REAL
---------------------- */

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("input--name--user").value.trim();
    const password = document
      .getElementById("input--password--user")
      .value.trim();

    if (nombre === "" || password === "") {
      alert("Completa todos los campos.");
      return;
    }

    try {
      // REQUEST AL BACKEND
      const res = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, password }),
      });

      const data = await res.json();

      // SI RESPONDE ERROR
      if (!res.ok) {
        alert(data.error || "Credenciales inválidas");
        return;
      }

      // =========================
      // GUARDAR TOKEN Y USUARIO
      // =========================
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nombre: data.nombre,
          rol: data.tipo,
        })
      );

      // =========================
      // MOSTRAR DATOS EN PANTALLA
      // =========================
      mostrarSesion({
        nombre: data.usuario,
        rol: data.tipo,
      });

      // CERRAR MODAL
      modalLogin.style.display = "none";

      cuentaLogeada = true;
    } catch (error) {
      console.error("Error login:", error);
      alert("Error de conexión con el servidor");
    }
  });

  /* ---------------------
       CERRAR SESIÓN
    ---------------------- */
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    ocultarSesion();
    alert("Sesión cerrada");
  });

  const btnCarrito = document.querySelector("#button--carrito");
  const carritoDiv = document.querySelector(".modal__carrito");
  const listaCarrito = document.querySelector(".carrito--items");
  const totalCarrito = document.querySelector(".pago--total");
  const btnCerrarCarrito = document.querySelector("#cerrar--modal--carrito");
  const numeroArticulos = document.querySelector(".numero--articulos");

  // ============================
  //      CARGAR CARRITO
  // ============================

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // ============================
  //      RENDER CARRITO
  // ============================

  function renderCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.classList.add("carrito--item");

      item.innerHTML = `
                <img src="${producto.url_imagen_principal?.trim() || 'assets/img/mueble1.png'}"
     alt="${producto.nombre}"class="item--img" />
                <div class="item--details">
                    <p class="item--name">${producto.nombre}</p>
                    <p class="item--price">$${producto.precio}</p>
                    <div class="carrito--quantity">
                        <label>Cantidad:</label>
                        <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="input-cantidad"/>
                    </div>
                </div>
                <button class="item--remove" data-index="${index}">Eliminar</button>
            `;

      listaCarrito.appendChild(item);

      total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `Total: $${total}`;
    numeroArticulos.textContent = carrito.length;
  }

  renderCarrito();

  // ============================
  //   ABRIR / CERRAR CARRITO
  // ============================

  btnCarrito.addEventListener("click", () => {
    carritoDiv.classList.add("show");
  });

  btnCerrarCarrito.addEventListener("click", () => {
    carritoDiv.classList.remove("show");
  });

  // ============================
  //   AGREGAR PRODUCTO
  // ============================

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mueble--agregar")) {
      const card = e.target.closest(".producto--card");

      const img = card.querySelector(".mueble--img").src;
      const nombre = card
        .querySelector(".mueble--descripcion")
        .textContent.trim();
      const precio = parseFloat(
        card.querySelector(".mueble--precio").textContent.replace("$", "")
      );
      const id = nombre.replace(/\s+/g, "-").toLowerCase();

      const existe = carrito.find((p) => p.id === id);

      if (existe) {
        existe.cantidad++;
      } else {
        carrito.push({
          id,
          nombre,
          precio,
          img,
          cantidad: 1,
        });
      }
      alert("Producto Añadido al carrito");
      guardarCarrito();
      renderCarrito();
    }
  });

  // ============================
  //  CAMBIAR CANTIDAD / ELIMINAR
  // ============================

  listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("item--remove")) {
      const index = e.target.getAttribute("data-index");
      carrito.splice(index, 1);
      guardarCarrito();
      renderCarrito();
    }
  });

  listaCarrito.addEventListener("change", (e) => {
    if (e.target.classList.contains("input-cantidad")) {
      const index = e.target.getAttribute("data-index");
      carrito[index].cantidad = parseInt(e.target.value);
      guardarCarrito();
      renderCarrito();
    }
  });
});
