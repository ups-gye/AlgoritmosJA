const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

function actualizar_usuario(dato) {
    return new Promise((resolve, reject) => {
        let resultado = storage.actualizar(dato);
        if (resultado) {
            return resolve(dato);
        } else {
            reject('No existe usuario para actualizar.');
        }
    });
}

function eliminar_usuario(dato) {
    return new Promise((resolve, reject) => {
        storage.eliminar(dato)
            .then(() => resolve(dato))
            .catch(() => reject('Error al eliminar el usuario.'));
    });
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    actualizar_usuario,
    eliminar_usuario
}