const Autor = require("../models/autor.model");
const mongoose = require('mongoose');

module.exports.getAllAutores = (_, response) => {
  Autor.find({})
    .then((autores) => response.json(autores))
    .catch((err) => response.json(err));
};
module.exports.getAutorById = (request, response) => {
  const { id } = request.params;
  Autor.findById(id)
    .then((autor) => {
      response.json(autor);
    })
    .catch((err) => response.json(err));
};
module.exports.createAutor = async (request, response) => {
  const { nombre } = request.body;
  if (!nombre) {
    response.status(400).json({ message: "Es mandatorios" });
  } else {
    Autor.create({ nombre })
      .then((autor) => response.json({ nombre: autor.nombre }))
      .catch((err) => response.json(err));
  }
};
module.exports.updateAutor = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(404).json({ 
                message: "Lo sentimos, pero no pudimos encontrar el autor que estás buscando" 
            });
        }
    const autorFound = await Autor.findOne({ _id: id });
    
    if (!autorFound) {
      return response.status(404).json({
        message:
          "Lo sentimos, pero no pudimos encontrar el autor que estás buscando",
      });
    }

    const autorActualizado = await Autor.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    return response.json(autorActualizado);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
};
module.exports.deleteAutor = (request, response) => {
  const { id } = request.params;
  Autor.findByIdAndDelete(id)
    .then(() => response.json({ msg: "Autor eliminado correctamente" }))
    .catch((err) => response.json(err));
};
