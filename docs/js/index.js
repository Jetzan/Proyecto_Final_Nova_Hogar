let index = 0; // Índice del slide actual
//Variables


//Elementos del DOM


const slides = document.querySelectorAll(".slide");
const puntos = document.querySelectorAll(".punto");
const btnLeft = document.querySelector(".hero__button--left");
const btnRight = document.querySelector(".hero__button--right");




//Funciones
// Mostrar slide actual
function mostrarSlide(i) {
  slides.forEach(s => s.classList.remove("activa"));
  puntos.forEach(p => p.classList.remove("punto--active"));

    document.getElementById("inicio").className="hero fondo"+(i+1);

  slides[i].classList.add("activa");
  puntos[i].classList.add("punto--active");


}




btnRight.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
});

btnLeft.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  mostrarSlide(index);
});

// Click en puntos
puntos.forEach((p, i) => {
  p.addEventListener("click", () => {
    index = i;
    mostrarSlide(i);
  });
});

// Iniciar
mostrarSlide(index);

// Auto slide cada 5 segundos
setInterval(() => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
}, 5000);




  // ==============================
  //     CARGAR PRODUCTOS
  // ==============================

  async function cargarProductos() {
     try {
        // Cargar productos de dormitorio
        const dormitorioRes = await fetch(`${API_URL}/products/dormitorios`);
        const dormitorios = await dormitorioRes.json();
        displayProducts(dormitorios, 0);
        
        // Cargar productos de sala
        const salaRes = await fetch(`${API_URL}/products/salas`);
        const salas = await salaRes.json();
        displayProducts(salas, 1);
        
        // Cargar productos de comedor
        const comedorRes = await fetch(`${API_URL}/products/comedores`);
        const comedores = await comedorRes.json();
        displayProducts(comedores, 2);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function displayProducts(productos, categoryIndex) {
    const categorias = document.querySelectorAll('.categoria--muebles');
    if (!categorias[categoryIndex]) return;
    
    const grid = categorias[categoryIndex].querySelector('.productos--grid');
    
    // Mostrar solo los primeros 3 productos
    const productosLimitados = productos.slice(0, 3);
    
    productosLimitados.forEach(producto=>{
      console.log(producto.url_imagen_principal);
    });
    grid.innerHTML = productosLimitados.map(producto => `
        <div class="producto--card" data-product-id="${producto.id}">
            <img class="mueble--img"
     src="${producto.url_imagen_principal?.trim() || 'assets/img/mueble1.png'}"
     alt="${producto.nombre}" />
            <p class="mueble--descripcion">${producto.nombre}</p>
            <p class="mueble--precio">$${parseFloat(producto.precio).toFixed(2)}</p>
            <button class="mueble--agregar" data-product-id="${producto.id}">Agregar a carrito</button>
        </div>
    `).join('');
    


    // Agregar event listeners a botones
    grid.querySelectorAll('.mueble--agregar').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            addToCart(productId);
        });
    });
  }
  cargarProductos();



buttonCerrarSuscripcion = document.getElementById("button--cerrar--suscribirse");

buttonSuscribirse.addEventListener("click",()=>{
  document.querySelector(".modal__suscribirse").style.display="none";
  
})



const buttonSuscribirse = document.getElementById("button--suscribirse");

buttonSuscribirse.addEventListener("click", () => {
  if (cuentaLogeada) {
    Swal.fire({
      title: "¡Suscripcion exitosa",
      text: "Gracias por suscribirse",
      icon: "succes",
      confirmButtonText: "Aceptar",
      timer: 3000,
      timerProgressBar: true,
    });
  } else {
    Swal.fire({
      title: "Atención",
      text: "Debes iniciar sesion para suscribirte",
      icon: "warning",
      confirmButtonText: "Aceptar",
      timer: 3000,
      timerProgressBar: true,
    });
  }
});
