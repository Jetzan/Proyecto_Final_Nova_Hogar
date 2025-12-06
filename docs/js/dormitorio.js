const API_URL = "https://backend-final-o904.onrender.com/api";

async function cargarDormi() {
  try {
    // Cargar productos de dormitorio
    const dormitorioRes = await fetch(`${API_URL}/products/dormitorios`);
    const dormitorios = await dormitorioRes.json();
    console.log(dormitorios);
    //console.log("Total de registros:", dormitorios.length);

    displayProducts(dormitorios);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

function displayProducts(productos) {

  const grid = document.querySelector(".productos--grid");
  if (!grid) return;

  // Mostrar todos los productos disponibles
  grid.innerHTML = productos
    .map(
      (producto) => `
        <div class="producto--card" data-product-id="${producto.id}">
          <img class="mueble--img" src="${
            producto.url_imagen || "assets/img/mueble1.png"
          }" alt="${producto.nombre}" />

          <p class="mueble--descripcion">${producto.nombre}</p>

          <p class="mueble--precio">$${parseFloat(producto.precio).toFixed(2)}</p>

          <button class="mueble--agregar" data-product-id="${producto.id}">
            Agregar a carrito
          </button>
        </div>
      `
    )
    .join("");

  // Listeners
  grid.querySelectorAll(".mueble--agregar").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.productId);
    });
  });
}