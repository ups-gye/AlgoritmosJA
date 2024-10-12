const model = require('./model')

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
     let filter = {}

     if (dato.apellido) {
        filter = { apellido: dato.apellido }
     }
     
     const resultado = await model.find( filter )
     return resultado
}

async function actualizar_usuario(dato) {
    const objeto = await model.findById(dato._id);

    if (objeto) {
        objeto.nombre = dato.nombre;
        objeto.apellido = dato.apellido;
        return await objeto.save();
    } else {
        return null;
    }
}

async function eliminar_usuario(dato) {
    return await model.deleteOne({ _id: dato._id });
}

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    actualizar:actualizar_usuario,
    eliminar:eliminar_usuario,
}