



let modalAbierto = false; // Variable para rastrear el estado del modal




function mostrarModalIniciarSesion() {
    const modalIniciar = document.querySelector('.modal__iniciar');
    modalIniciar.style.display = 'flex';
    console.log("Modal de iniciar sesión mostrado");
    modalAbierto = true;
}


const buttonInicarSesionRegistro = document.getElementById('button--iniciar--sesion--registro');    



// Mostrar el modal de iniciar sesión desde la página de registro
buttonInicarSesionRegistro.addEventListener('click', mostrarModalIniciarSesion);


window.addEventListener('click', function(event) {
    const modalIniciar = document.querySelector('.modal__iniciar');
    if(modalAbierto){
        if (event.target !== modalIniciar && event.target !== buttonInicarSesionRegistro &&!modalIniciar.contains(event.target)) {
            modalIniciar.style.display = 'none';
            modalAbierto = false;
            console.log("Modal de iniciar sesión cerrado");
        }
    }
});









  const obtenerPaises = async () => {
  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all?fields=name");
    if (!respuesta.ok) throw new Error("Error en la respuesta");
    const datos = await respuesta.json();
    const nombres = datos
      .map(p => p.name.common)
      .sort();
      nombres.forEach((nombrePais) => {
        const opcion = document.createElement("option");
        opcion.value = nombrePais;
        opcion.textContent = nombrePais;
        document.getElementById("paises").appendChild(opcion);
      });
  } catch (error) {
    console.error("% Error al obtener los países:", error);
  }
};

obtenerPaises();