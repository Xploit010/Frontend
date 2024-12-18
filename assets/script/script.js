import { api } from "./utils.js";

import "./funcionProducto.js";

export const modal = new bootstrap.Modal("#Formulario", {
    keyboard: false,
});


document.addEventListener("DOMContentLoaded", function () {
    cargaDatosProducto(); // llamado a la funcion cargaDatosProducto

    const form = document.querySelector("form");

    const { nombre, descripcion, precio, image, editar } = form.elements; // Destructuring: recupera los elementos del formulario

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se recargue la página
        const data = {


            nombre: nombre.value,
            descripcion: descripcion.value,
            precio: precio.value,
            image: image.value
        };

        // enviar los datos
        api({
            method: editar.value ? "PUT" : "POST",
            url: editar.value ? `/productos/${editar.value}` : "/productos",
            data,
        })
            .then(({ data }) => {
                console.log(data);
                Swal.fire("Exito!", data.message, "success")
                cargaDatosProducto()
                form.reset()
                modal.hide()
            })
            .catch((err) =>
                Swal.fire("Error!", err?.response?.data?.message, "error")
            );
    });
});

export function cargaDatosProducto() {
    const card = document.querySelector("#contenedor-card");
    card.innerHTML = "";
    // peticion a localhost:3000/productos del server de node
    api.get(`/productos`).then(({ data }) => {
        for (const producto of data) {

            card.innerHTML += `
                        <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="${producto.image}"
                            class="card-img-top" alt="Chocoramo">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="text-primary fw-bold">${producto.precio}</p>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="editarProducto(${producto.id})">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
      `;
        }
    });
}