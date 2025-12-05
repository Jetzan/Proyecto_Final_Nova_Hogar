// =======================
// CONFIG
// =======================

const API_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");

// Si no hay token → fuera
if (!token) {
    Swal.fire("No autorizado", "Inicia sesión primero", "error");
    window.location = "login.html";
}

// =======================
// ELEMENTOS
// =======================

const tablaBody = document.querySelector(".products-table tbody");
const searchInput = document.querySelector(".search-input");

// Inputs ALTA
const inputAlta = {
    nombre: document.querySelector('.tab-alta input[placeholder="Nombre"]'),
    descripcion: document.querySelector('.tab-alta input[placeholder="Descripción"]'),
    precio: document.querySelector('.tab-alta input[placeholder="Precio"]'),
    imagen: document.querySelector('.tab-alta input[placeholder="Imagen"]'),
    stock: document.querySelector('.tab-alta input[placeholder="Stock inicial"]'),
    categoria: document.querySelector('.tab-alta input[placeholder="Categoría"]')
};

// Botón
const btnAgregar = document.querySelector('.tab-alta .primary-btn');


// =======================
// 1. Cargar tabla
// =======================

async function cargarProductos() {
    try {
        const res = await fetch(`${API_URL}/products`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const data = await res.json();
        tablaBody.innerHTML = "";

        data.forEach(prod => {
            tablaBody.innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
                <td>${prod.cat}</td>
                <td>${prod.stock}</td>
                <td>
                    <a href="#gestion-productos" class="primary-btn" onclick="cargarParaEdicion(${prod.id})">Editar</a>
                </td>
            </tr>`;
        });

    } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar productos", "error");
    }
}

cargarProductos();


// =======================
// 2. Buscar
// =======================

searchInput.addEventListener("input", () => {
    const filtro = searchInput.value.toLowerCase();
    [...tablaBody.children].forEach(tr => {
        const texto = tr.innerText.toLowerCase();
        tr.style.display = texto.includes(filtro) ? "" : "none";
    });
});


// =======================
// 3. ALTA Producto
// =======================

btnAgregar.addEventListener("click", async () => {

    const body = {
        nombre: inputAlta.nombre.value,
        descripcion: inputAlta.descripcion.value,
        precio: inputAlta.precio.value,
        categoria: inputAlta.categoria.value,
        stockIn: inputAlta.stock.value
    };

    // Validar
    if (Object.values(body).some(v => v.trim() === "")) {
        Swal.fire("Campos vacíos", "Completa todos los campos", "warning");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/admin/newProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            Swal.fire("Error", data.mensaje || "No se pudo registrar", "error");
            return;
        }

        Swal.fire("Hecho", "Producto registrado con ID: " + data.id_insertado, "success");

        // limpiar
        Object.values(inputAlta).forEach(i => i.value = "");

        cargarProductos();

    } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo agregar producto", "error");
    }
});


// =======================
// 4. Carga de datos para edición (cambio)
// =======================

async function cargarParaEdicion(id) {
    try {
        const res = await fetch(`${API_URL}/admin/product/${id}`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const prod = await res.json();

        document.querySelector('#tab-cambio').checked = true;

        document.querySelector('.tab-cambio input[placeholder="Ingresa ID de producto"]').value = prod.id;
        document.querySelector('.tab-cambio input[placeholder="Nombre"]').value = prod.nombre;
        document.querySelector('.tab-cambio input[placeholder="Descripción"]').value = prod.descripcion;
        document.querySelector('.tab-cambio input[placeholder="Precio"]').value = prod.precio;
        document.querySelector('.tab-cambio input[placeholder="Imagen"]').value = ""; // luego
        document.querySelector('.tab-cambio input[placeholder="Stock inicial"]').value = prod.stock;
        document.querySelector('.tab-cambio input[placeholder="Categoría"]').value = prod.cat;
        document.querySelector('.tab-cambio input[placeholder="ID"]').value = prod.id;

    } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo cargar producto", "error");
    }
}

window.cargarParaEdicion = cargarParaEdicion;


// =======================
// 5. Actualizar (cambio)
// =======================

document.querySelector('.tab-cambio .primary-btn').addEventListener("click", async () => {

    const id = document.querySelector('.tab-cambio input[placeholder="ID"]').value;

    const body = {
        nombre: document.querySelector('.tab-cambio input[placeholder="Nombre"]').value,
        descripcion: document.querySelector('.tab-cambio input[placeholder="Descripción"]').value,
        precio: document.querySelector('.tab-cambio input[placeholder="Precio"]').value,
        categoria: document.querySelector('.tab-cambio input[placeholder="Categoría"]').value,
        stockIN: document.querySelector('.tab-cambio input[placeholder="Stock inicial"]').value
    };

    try {
        const res = await fetch(`${API_URL}/admin/product/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            Swal.fire("Error", data.mensaje, "error");
            return;
        }

        Swal.fire("Actualizado", "Producto actualizado", "success");
        cargarProductos();

    } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo actualizar", "error");
    }
});


// =======================
// 6. Eliminar
// =======================

async function eliminarProducto(id) {

    const confirm = await Swal.fire({
        title: "¿Eliminar?",
        text: "Esto no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar"
    });

    if (!confirm.isConfirmed) return;

    try {
        const res = await fetch(`${API_URL}/admin/product/${id}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        });

        const data = await res.json();

        if (!res.ok) {
            Swal.fire("Error", data.mensaje, "error");
            return;
        }

        Swal.fire("Eliminado", "Producto eliminado", "success");
        cargarProductos();

    } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo eliminar", "error");
    }
}

window.eliminarProducto = eliminarProducto;
