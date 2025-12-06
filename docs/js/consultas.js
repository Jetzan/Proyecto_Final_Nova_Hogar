



// ===========================
// TOKEN PARA AUTORIZACIÓN
// ===========================
function getHeadersJson() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

function getHeadersForm() {
    const token = localStorage.getItem("token");
    return {
        "Authorization": `Bearer ${token}`
    };
}

// ===========================
// CREAR PRODUCTO
// ===========================
async function crearProducto(data) {
    const res = await fetch(API_URL+"/admin/newProduct", {
        method: "POST",
        headers: getHeadersJson(),
        body: JSON.stringify(data)
    });
    return res.json();
}

// ===========================
// SUBIR IMÁGENES
// ===========================
async function subirImagenes(idProducto, archivos) {
    const formData = new FormData();
    formData.append("idProducto", idProducto);

    for (let archivo of archivos) {
        formData.append("imagenes", archivo);
    }

    const res = await fetch(API_URL+"/admin/newProduct/uploadImages", {
        method: "POST",
        headers: getHeadersForm(),
        body: formData
    });

    return res.json();
}

// ===========================
// ACTUALIZAR PRODUCTO
// ===========================
async function actualizarProducto(id, data) {
    const res = await fetch(API_URL+`/admin/product/${id}`, {
        method: "PUT",
        headers: getHeadersJson(),
        body: JSON.stringify(data)
    });
    return res.json();
}

// ===========================
// ACTUALIZAR STOCK
// ===========================
async function actualizarStock(id, stockIN) {
    const res = await fetch(API_URL+`/admin/product/${id}/stock`, {
        method: "PUT",
        headers: getHeadersJson(),
        body: JSON.stringify({ stockIN })
    });
    return res.json();
}

// ===========================
// ELIMINAR PRODUCTO
// ===========================
async function eliminarProducto(id) {
    const res = await fetch(API_URL+`/admin/product/${id}`, {
        method: "DELETE",
        headers: getHeadersForm()
    });
    return res.json();
}



console.log("admin-form.js cargado");

// =====================================
// FORM CREAR PRODUCTO
// =====================================
document.getElementById("formCrearProducto").addEventListener("submit", async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    const r = await crearProducto(data);
    document.getElementById("respCrear").textContent = r.mensaje || JSON.stringify(r);
});

// =====================================
// FORM SUBIR IMÁGENES
// =====================================
document.getElementById("formSubirImagenes").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("img-idProducto").value;
    const files = document.getElementById("img-archivos").files;

    const r = await subirImagenes(id, files);
    document.getElementById("respImg").textContent = r.mensaje || JSON.stringify(r);
});

// =====================================
// FORM ACTUALIZAR PRODUCTO
// =====================================
document.getElementById("formActualizarProducto").addEventListener("submit", async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    const id = data.id;
    delete data.id;

    const r = await actualizarProducto(id, data);
    document.getElementById("respActualizar").textContent = r.mensaje || JSON.stringify(r);
});

// =====================================
// FORM ACTUALIZAR STOCK
// =====================================
document.getElementById("formStock").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("stock-id").value;
    const stock = Number(document.getElementById("stock-value").value);

    const r = await actualizarStock(id, stock);
    document.getElementById("respStock").textContent = r.mensaje || JSON.stringify(r);
});

// =====================================
// FORM ELIMINAR PRODUCTO
// =====================================
document.getElementById("formEliminarProducto").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("delete-id").value;

    const r = await eliminarProducto(id);
    document.getElementById("respEliminar").textContent = r.mensaje || JSON.stringify(r);
});
