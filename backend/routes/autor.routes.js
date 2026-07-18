const AutorController = require("../controllers/autor.controller");


module.exports = function(app){

    app.get("/api/autores", AutorController.getAllAutores);
    app.get("/api/autores/:id", AutorController.getAutorById);
    app.post("/api/autores", AutorController.createAutor);
    app.put("/api/autores/:id", AutorController.updateAutor);
    app.delete("/api/autores/:id", AutorController.deleteAutor);
};