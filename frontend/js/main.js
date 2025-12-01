//Variables
let modalAbierto = false; // Variable para rastrear el estado del modal
let modalCarritoAbierto = false;


//Elementos del DOM


// Seleccionar el botón de iniciar sesión
const buttonIniciarSesion = document.getElementById('button--iniciar--sesion');

//Seleccionar el botón de carrito
const buttonCarrito = document.getElementById('button--carrito');

//Seleccionar el botón de cerrar modal carrito
const buttonCerrarModalCarrito = document.getElementById('cerrar--modal--carrito');



//Funciones

function mostrarModalIniciarSesion() {
    const modalIniciar = document.querySelector('.modal__iniciar');
    modalIniciar.style.display = 'flex';
    console.log("Modal de iniciar sesión mostrado");
    modalAbierto = true;
}

//Mostrar modal carrito
function mostrarModalCarrito() {
    console.log("Botón de carrito presionado");
    const modalCarrito = document.querySelector('.modal__carrito');
    modalCarrito.style.display = 'flex';
    console.log("Modal de carrito mostrado");
    modalAbierto = true;
}

function cerrarModalCarrito() {
    const modalCarrito = document.querySelector('.modal__carrito');
    modalCarrito.style.display = 'none';
    console.log("Modal de carrito cerrado");
    modalAbierto = false;
}



//Eventos
buttonIniciarSesion.addEventListener('click', mostrarModalIniciarSesion);
buttonCarrito.addEventListener('click', mostrarModalCarrito);
buttonCerrarModalCarrito.addEventListener('click', cerrarModalCarrito);

window.addEventListener('click', function(event) {
    
    
    const modalIniciar = document.querySelector('.modal__iniciar');
    if(modalAbierto){
        if (event.target !== modalIniciar && event.target !== buttonIniciarSesion &&!modalIniciar.contains(event.target)) {
            modalIniciar.style.display = 'none';
            modalAbierto = false;
            console.log("Modal de iniciar sesión cerrado");
        }
    }
});




