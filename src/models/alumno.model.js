const { default: mongoose } = require("mongoose");

// moduls/alumno.moduljs
const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }]
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;