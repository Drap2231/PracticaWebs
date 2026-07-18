require ("./config/mongoose.config")
const express = require("express")
const app = express()
const puerto = 8000
const cors = require('cors');
const allAutoresRoutes = require("./routes/autor.routes");
app.use(express.json())
app.use(cors());   
allAutoresRoutes(app);
app.listen (puerto, ()=>console.log("El servidor esta escuchando en el puerto:", puerto))