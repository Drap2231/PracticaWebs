const mongoose = require('mongoose');
const AutorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [
                true,
                "El nombre es requerido OwO"
            ]
        }
}
    ,
    { versionKey: false }
);
const Autor = mongoose.model("Autor", AutorSchema);
module.exports = Autor;