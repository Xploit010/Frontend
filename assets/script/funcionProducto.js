import { cargaDatosProducto, modal } from "./script.js";

const form = document.querySelector("form");

window.editarProducto = function (id) {
    fetch("http://localhost:3000/productos/" + id)
        .then((response) => response.json())
        .then((data) => {
            const { nombre, descripcion, precio, image } = form.elements;

            // asignar los valores a los campos del formulario
            editar.value = data.id;
            nombre.value = data.nombre;
            descripcion.value = data.descripcion;
            precio.value = data.precio;
            image.value = data.image;

            modal.show();
        });
};

window.limpiarFormulario = function () {
    form.reset();
};

window.eliminarProducto = function (id) {
    Swal.fire({
        title: "Estas seguro?",
        text: "¡no podras deshacer cambios!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar",
    }).then(function (result) {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/productos/${id}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => {
                    Swal.fire("Eliminado!", data.message, "success");
                    cargaDatosProducto();
                });
        }
    });
};
