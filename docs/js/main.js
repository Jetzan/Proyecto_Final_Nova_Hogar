//Variables
let modalAbierto = false; // Variable para rastrear el estado del modal
let modalCarritoAbierto = false;
let modalAccesibilidadAbierto = false;


//Elementos del DOM

// Seleccionar el botón de iniciar sesión
const buttonIniciarSesion = document.getElementById("button--iniciar--sesion");

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

//Seleccionar el modal de iniciar seison
const modalIniciar = document.querySelector(".modal__iniciar");

//Funciones

function mostrarModalIniciarSesion() {
  const modalIniciar = document.querySelector(".modal__iniciar");
  modalIniciar.style.display = "flex";
  console.log("Modal de iniciar sesión mostrado");
  modalAbierto = true;
}

//Mostrar modal carrito
function mostrarModalCarrito() {
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

function cerrarModalIniciarSesion() {
  modalIniciar.style.display = "none";
  modalAbierto = false;
  console.log("Modal de iniciar sesión cerrado");
}

//Eventos
buttonIniciarSesion.addEventListener("click", mostrarModalIniciarSesion);
buttonCerrarModalIniciar.addEventListener("click", cerrarModalIniciarSesion);

buttonCarrito.addEventListener("click", mostrarModalCarrito);
buttonCerrarModalCarrito.addEventListener("click", cerrarModalCarrito);

window.addEventListener("click", function (event) {
  if (modalAbierto) {
    if (
      event.target !== modalIniciar &&
      event.target !== buttonIniciarSesion &&
      !modalIniciar.contains(event.target)
    ) {
      cerrarModalIniciarSesion();
    }
  }
});






const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const colorFondo = getComputedStyle(document.documentElement)
              .getPropertyValue('--fondo-main')
              .trim();

  console.log(colorFondo);
  if(colorFondo=="#E6DED4"){
    document.documentElement.style.setProperty('--fondo-main', '#26221F');
  }else{
    document.documentElement.style.setProperty('--fondo-main', '#E6DED4');

  }
});

// Mostrar/ocultar menú
const menu = document.getElementById("accessibilityMenu");
const button = document.getElementById("button--accesibilidad");


const slider = document.querySelector('.accessibility__slider');

let valorAntes=1;
let valorDespues=1;


slider.addEventListener('input', () => {
    const scale = slider.value; 
    document.querySelector(".accessibility--example").style.fontSize = "calc(1rem + "+scale*2+"px)";
    valorDespues=scale;
  });
  
  
  
  
  
  
  const buttonCerrarAccesbilidad = document.getElementById("cerrar--accesibilidad");
  
  function cerrarAccesbilidad (){
    if(modalAccesibilidadAbierto){
      
      if(valorAntes!=valorDespues){
        valorAntes=valorDespues;
        document.documentElement.style.fontSize = "calc(1rem + "+valorAntes*2+"px)";
        
      }
      menu.style.display="none";
      modalAccesibilidadAbierto=false;
    }else{
      
    }
  }
  
  
  buttonCerrarAccesbilidad.addEventListener("click",cerrarAccesbilidad);
  
  button.addEventListener("click", () => {
    if(modalAccesibilidadAbierto){
      
    }else{
      menu.style.display="flex";
      modalAccesibilidadAbierto=true;
      
    }
  });
