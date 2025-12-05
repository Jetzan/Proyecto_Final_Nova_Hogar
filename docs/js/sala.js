const API_URL = "https://backend-final-o904.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  //     CARGAR PRODUCTOS
  // ==============================

  async function cargarProductos() {
    try {
      // Cargar productos de dormitorio
    //   const dormitorioRes = await fetch(`${API_URL}/products/dormitorios`);
    //   const dormitorios = await dormitorioRes.json();
    //   displayProducts(dormitorios, 0);

      // ❌ ELIMINA/COMENTA LO DEMÁS
      /**/ 
    // Cargar productos de sala
    const salaRes = await fetch(`${API_URL}/products/salas`);
    const salas = await salaRes.json();
    displayProducts(salas, 1);
        
    //Cargar productos de comedor
    // const comedorRes = await fetch(`${API_URL}/products/comedores`);
    // const comedores = await comedorRes.json();
    // displayProducts(comedores, 2);
    
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  function displayProducts(productos, categoryIndex) {
    const categorias = document.querySelectorAll(".categoria--muebles");
    if (!categorias[categoryIndex]) return;

    const grid = categorias[categoryIndex].querySelector(".productos--grid");

    // Mostrar solo los primeros 3 productos
    const productosLimitados = productos.slice(0, 3);

    grid.innerHTML = productosLimitados
      .map(
        (producto) => `
        <div class="producto--card" data-product-id="${producto.id}">
            <img class="mueble--img" src="${
              producto.url_imagen_principal || "assets/img/mueble1"
            }" alt="${producto.nombre}" />
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
        addToCart(productId);
      });
    });
  }

  cargarProductos();
});
