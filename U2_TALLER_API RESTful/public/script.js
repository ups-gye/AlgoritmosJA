function guardar() {

    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value

    let data = { nombre:nombre_, apellido:apellido_ }

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('http://localhost:3000/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function eliminar_usuario(apellido) {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ apellido }) 
        };

        fetch('http://localhost:3000/usuario', request_options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el usuario');
                }
                alert('Registro Eliminado exitoso.')
                return response.json();                
            })
            .then(data => resolve(data))
            .catch(error => reject(`[error]: ${error}`));
    });
}

function guardar_usuario() {
    guardar()
        .then( (response) => {
            alert('Registro exitoso.')
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
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
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(`[error]: ${error}`));
    });
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

            // Validamos los usuarios
            if (Array.isArray(usuarios)) {
                usuarios.forEach((usuario) => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `<td>${usuario.nombre}</td><td>${usuario.apellido}</td><td><button onclick="eliminar_usuario('${usuario.apellido}')">Eliminar</button></td><td><button onclick="mostrarFormularioActualizar('${usuario.apellido}', '${usuario.nombre}')">Actualizar</button></td>`;
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

// Llamar a listar al cargar la página para mostrar usuarios
document.addEventListener('DOMContentLoaded', listar);