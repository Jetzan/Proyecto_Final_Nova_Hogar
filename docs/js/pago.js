
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

  //inputs relacionados a solo caracteres
  const inputPhone = document.querySelector('.cardPayment__phone');
  const inputNumber = document.querySelector('.cardPayment__number');
  const inputCVV = document.querySelector('.cardPayment__security');
  const inputExpire = document.querySelector('.cardPayment__expire'); // para MM/AA

function onlyNumbers(e, maxLength) {
    e.target.value = e.target.value.replace(/\D/g, '');
    
    if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
    }
}

inputPhone.addEventListener('input', (e) => onlyNumbers(e, 10));

inputNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0,16); // máximo 16 dígitos
    
    value = value.match(/.{1,4}/g)?.join(' ') || '';
    
    e.target.value = value;
});

inputCVV.addEventListener('input', (e) => onlyNumbers(e, 4));

inputExpire.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d/]/g, '');
    
    if (e.target.value.length === 2 && !e.target.value.includes('/')) {
        e.target.value += '/';
    }
    
    if (e.target.value.length > 5) {
        e.target.value = e.target.value.slice(0,5);
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
