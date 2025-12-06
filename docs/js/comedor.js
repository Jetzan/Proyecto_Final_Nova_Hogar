
async function cargarCome() {
  try {
    // Cargar productos de comedor
    const comedorRes = await fetch(`${API_URL}/products/comedores`);
    const comedores = await comedorRes.json();
    displayProducts(comedores);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

function displayProducts(productos) {

  const grid = document.querySelector(".productos--grid");

  productos.forEach((producto) => {
  });
  grid.innerHTML = productos
    .map(
      (producto) => `
        <div class="producto--card" data-product-id="${producto.id}">
            <img class="mueble--img"
     src="${producto.url_imagen?.trim() || "assets/img/mueble1.png"}"
     alt="${producto.nombre}" />
            <p class="mueble--descripcion">${producto.nombre}</p>
            <p class="mueble--precio">$${parseFloat(producto.precio).toFixed(
              2
            )}</p>
            <button class="mueble--agregar" data-product-id="${
              producto.id
            }">Agregar a carrito</button>
        </div>
    `
    )
    .join("");

  // Agregar event listeners a botones
  grid.querySelectorAll(".mueble--agregar").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.productId;
    });
  });
}