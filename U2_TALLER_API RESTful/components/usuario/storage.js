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

async function actualizar_usuario( dato ) {
    const objeto = await model.findOne( {apellido: dato.apellido} )

    if ( objeto ) {
        objeto.nombre = dato.nombre    
        return resultado = await objeto.save()    
    } else {
        return null
    }
}

async function eliminar_usuario( dato ) {
    return await model.deleteOne({apellido: dato.apellido})
}

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    actualizar:actualizar_usuario,
    eliminar:eliminar_usuario,
}