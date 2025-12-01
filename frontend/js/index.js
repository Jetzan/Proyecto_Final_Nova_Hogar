//Variables
let index = 0; // Índice del slide actual


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
