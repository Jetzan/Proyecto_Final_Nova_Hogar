document.getElementById("form--contacto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("input--nombre--contacto").value.trim();
  const correo = document.getElementById("input--email--contacto").value.trim();
  const mensaje = document.getElementById("input--mensaje--contacto").value.trim();

  // Validación básica
  if (!nombre || !correo || !mensaje) {
    alert("Por favor llena todos los campos");
    return;
  }

  try {
    const response = await fetch("https://backend-final-o904.onrender.com/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        mensaje,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Error al enviar mensaje");
      return;
    }

    // Éxito
    alert(data.mensaje);

    // Limpia formulario
    document.getElementById("form--contacto").reset();

  } catch (error) {
    console.error("Error:", error);
    alert("Error enviando mensaje");
  }
});
