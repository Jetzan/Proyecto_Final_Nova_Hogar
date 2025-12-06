// ===============================
// Comedor - Listado y filtro por precio
// ===============================

let productosComedorOriginal = [];

// Carga inicial de productos de comedor
async function cargarCome() {
  try {
    const comedorRes = await fetch(`${API_URL}/products/comedores`);
    const comedores = await comedorRes.json();

    productosComedorOriginal = Array.isArray(comedores) ? comedores : [];

    inicializarFiltroComedor();
    displayProductsComedor(productosComedorOriginal);
  } catch (error) {
    console.error("Error al cargar productos de comedor:", error);
  }
}

// Inicializar select de filtro
function inicializarFiltroComedor() {
  const filtroSelect = document.getElementById("filtro--precio");
  if (!filtroSelect) return;

  filtroSelect.addEventListener("change", () => {
    aplicarFiltroComedor(filtroSelect.value);
  });
}

// Aplica el filtro/orden elegido
function aplicarFiltroComedor(tipo) {
  if (!Array.isArray(productosComedorOriginal)) return;

  let productosFiltrados = [...productosComedorOriginal];

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
      productosFiltrados = [...productosComedorOriginal];
      break;
  }

  displayProductsComedor(productosFiltrados);
}

// Render de tarjetas de productos
function displayProductsComedor(productos) {
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
