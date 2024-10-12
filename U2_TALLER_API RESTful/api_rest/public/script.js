let usuarioActual = null;

function guardar() {
    let nombre_ = document.getElementById('nombre').value;
    let apellido_ = document.getElementById('apellido').value;

    let data = { nombre: nombre_, apellido: apellido_ };

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:3000/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    });
}

function eliminar_usuario(id) {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        };

        fetch('http://localhost:3000/usuario', request_options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el usuario');
                }
                alert('Registro eliminado exitosamente.');
                listar();
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(`[error]: ${error}`));
    });
}

function guardar_usuario() {
    if (usuarioActual) {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        actualizar_usuario({ ...usuarioActual, nombre, apellido });
    } else {
        guardar()
            .then((response) => {
                alert('Registro exitoso.');
                listar();
            })
            .catch((error) => {
                alert('Error al ingresar.');
            });
    }
}

function actualizar_usuario(data) {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:3000/usuario', request_options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el usuario');
                }
                alert('Registro actualizado exitosamente.');
                usuarioActual = null; 
                listar(); 
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(`[error]: ${error}`));
    });
}

function mostrarFormularioActualizar(apellido, nombre) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    usuarioActual = { nombre, apellido }; 
}

function listar() {
    fetch('http://localhost:3000/usuario')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }
            return response.json();
        })
        .then((data) => {
            const usuarios = data.body;
            const tabla = document.getElementById('tabla-usuarios').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';

            if (Array.isArray(usuarios)) {
                usuarios.forEach((usuario) => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td contenteditable="true" id="nombre-${usuario._id}">${usuario.nombre}</td>
                        <td contenteditable="true" id="apellido-${usuario._id}">${usuario.apellido}</td>
                        <td><button onclick="eliminar_usuario('${usuario._id}')">Eliminar</button></td>
                        <td><button onclick="prepararActualizar('${usuario._id}')">Actualizar</button></td>`;
                    tabla.appendChild(fila);
                });
            } else {
                console.error('La respuesta no es un array:', usuarios);
            }
        })
        .catch((error) => {
            console.error(`[error]: ${error}`);
        });
}

function prepararActualizar(id) {
    const nombre = document.getElementById(`nombre-${id}`).innerText.trim();
    const apellidoNuevo = document.getElementById(`apellido-${id}`).innerText.trim();
    actualizar_usuario({ _id: id, nombre, apellido: apellidoNuevo });
}

document.addEventListener('DOMContentLoaded', listar);
