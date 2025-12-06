
  // Seleccionamos los botones y contenedores
  const btnTarjeta = document.querySelector('.interfazPago__button--tarjeta');
  const cardPayment = document.querySelector('.cardPayment');

  const btnTransfer = document.querySelector('.interfazPago__button--transferencia');
  const transferPayment = document.querySelector('.transferPayment');

  const btnOxxo = document.querySelector('.interfazPago__button--oxxo');
  const oxxoPayment = document.querySelector('.oxxoPayment');

  // Función para ocultar todos los contenedores
  function hideAllPayments() {
    cardPayment.classList.add('hidden');
    transferPayment.classList.add('hidden');
    oxxoPayment.classList.add('hidden');
  }

  // Eventos click para cada botón
  btnTarjeta.addEventListener('click', () => {
    if (cardPayment.classList.contains('hidden')) {
      hideAllPayments();
      cardPayment.classList.remove('hidden');
    } else {
      cardPayment.classList.add('hidden');
    }
  });

  btnTransfer.addEventListener('click', () => {
    if (transferPayment.classList.contains('hidden')) {
      hideAllPayments();
      transferPayment.classList.remove('hidden');
    } else {
      transferPayment.classList.add('hidden');
    }
  });

  btnOxxo.addEventListener('click', () => {
    if (oxxoPayment.classList.contains('hidden')) {
      hideAllPayments();
      oxxoPayment.classList.remove('hidden');
    } else {
      oxxoPayment.classList.add('hidden');
    }
  });


// Función encargada de mostrar los datos de los productos agregados al carrito
// en la página de métodos de pago, incluyendo la imagen de cada producto
async function cargarCarritoEnPago() {
    try {
        // Obtener carrito desde LocalStorage
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const contenedor = document.getElementById("productosPago");
        contenedor.innerHTML = "";

        if (carrito.length === 0) {
            contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
            return;
        }

        // Mostrar cada producto guardado en LocalStorage
        carrito.forEach(item => {
            const itemHTML = `
                <div class="productInfo__item">
                    <img src="${item.img}" alt="${item.nombre}" class="productInfo__img">
                    <p class="productInfo__infoName">${item.nombre}</p>
                    <p class="productInfo__infoPrice">$${item.precio} x ${item.cantidad}</p>
                </div>
            `;
            contenedor.innerHTML += itemHTML;
        });

    } catch (error) {
        console.error("Error cargando carrito:", error);
    }
}




const botonPago = document.querySelector('.cardPayment__submit');

botonPago.addEventListener('click', async () => {

    // Capturar datos desde el formulario
    const datos = {
        nombre_cliente: document.querySelector('.cardPayment__nombre-cliente').value,
        direccion: document.querySelector('.cardPayment__direccion').value,
        ciudad: document.querySelector('.cardPayment__ciudad').value,
        codigo_postal: document.querySelector('.cardPayment__codigo-postal').value,
        telefono: document.querySelector('.cardPayment__telefono').value,
        pais: document.querySelector('.cardPayment__pais').value,
        metodo_pago: document.querySelector('input[name="metodoPago"]:checked')?.value, 
        codigo_cupon: document.querySelector('.cardPayment__codigo-cupon').value || ""
    };

    console.log("Datos enviados al backend:", datos);

    try {
        const res = await fetch(`${API_URL}/purchase/process`, {
            method: "POST",
            credentials: "include", // IMPORTANTE para enviar cookies del login
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const respuesta = await res.json();
        console.log("Respuesta del backend:", respuesta);

        if (res.ok) {
            alert("Compra procesada exitosamente. Orden ID: " + respuesta.ordenId);
        } else {
            alert("Error: " + respuesta.error);
        }

    } catch (error) {
        console.error("Error enviando datos de pago:", error);
        alert("Ocurrió un error al procesar tu compra.");
    }
});