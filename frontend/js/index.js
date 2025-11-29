let modalAbierto = false; // Variable para rastrear el estado del modal

const buttonIniciarSesion = document.getElementById('button--iniciar--sesion');



function mostrarModalIniciarSesion() {
    const modalIniciar = document.querySelector('.modal__iniciar');
    modalIniciar.style.display = 'flex';
    console.log("Modal de iniciar sesión mostrado");
    modalAbierto = true;
}


buttonIniciarSesion.addEventListener('click', mostrarModalIniciarSesion);


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

