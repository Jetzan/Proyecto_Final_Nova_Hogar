// ===============================
// Sala - Listado y filtro por precio
// ===============================

let productosSalaOriginal = [];

// Carga inicial de productos de sala
async function cargarSal() {
  try {
    const salasRes = await fetch(`${API_URL}/products/salas`);
    const salas = await salasRes.json();

    // Guardar copia original para poder reordenar sin perder el orden base
    productosSalaOriginal = Array.isArray(salas) ? salas : [];

    inicializarFiltroSala();
    displayProductsSala(productosSalaOriginal);
  } catch (error) {
    console.error("Error al cargar productos de sala:", error);
  }
}

// Inicializar select de filtro
function inicializarFiltroSala() {
  const filtroSelect = document.getElementById("filtro--precio");
  if (!filtroSelect) return;

  filtroSelect.addEventListener("change", () => {
    aplicarFiltroSala(filtroSelect.value);
  });
}

// Aplica el filtro/orden elegido
function aplicarFiltroSala(tipo) {
  if (!Array.isArray(productosSalaOriginal)) return;

  let productosFiltrados = [...productosSalaOriginal];

  switch (tipo) {
    case "menor--mayor":
      productosFiltrados.sort(
        (a, b) => parseFloat(a.precio || 0) - parseFloat(b.precio || 0)
      );
      break;
    case "mayor--menor":
      productosFiltrados.sort(
        (a, b) => parseFloat(b.precio || 0) - parseFloat(a.precio || 0)
      );
      break;
    case "todos":
    default:
      // No ordenar, se respeta el orden original
      productosFiltrados = [...productosSalaOriginal];
      break;
  }

  displayProductsSala(productosFiltrados);
}

// Render de tarjetas de productos
function displayProductsSala(productos) {
  const grid = document.querySelector(".productos--grid");
  if (!grid) return;

  grid.innerHTML = (productos || [])
    .map(
      (producto) => `
        <div class="producto--card" data-product-id="${producto.id}">
          <img
            class="mueble--img"
            src="${
              (producto.url_imagen && producto.url_imagen.trim()) ||
              "assets/img/mueble1.png"
            }"
            alt="${producto.nombre}"
          />
          <p class="mueble--descripcion">${producto.nombre}</p>
          <p class="mueble--precio">
            $${parseFloat(producto.precio || 0).toFixed(2)}
          </p>
          <button
            class="mueble--agregar"
            data-product-id="${producto.id}"
          >
            Agregar a carrito
          </button>
        </div>
      `
    )
    .join("");

  // Listeners de "Agregar a carrito"
  grid.querySelectorAll(".mueble--agregar").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      if (typeof addToCart === "function") {
        addToCart(productId);
      } else {
        console.warn("addToCart no está definida en esta página.");
      }
    });
  });
}
