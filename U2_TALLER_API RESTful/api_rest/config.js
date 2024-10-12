const config = {
    //Validar sin Dockerizar
    PORT: 3000,
    DB_URL: 'mongodb://dba:12345@localhost:27017/miapp?authSource=admin'
    //Dockerizado se cambia el puerto para que no de conflicto
    /*PORT: 9191,
    DB_URL: 'mongodb://dba:12345@mongodb:27017/miapp?authSource=admin'*/
}

module.exports = config