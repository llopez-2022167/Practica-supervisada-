//models.user.model
const mongoose = require('mongoose');

const usuarioScheam = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    email: {
        type: String,
        requiered: true,
        unique: true
    },
    constraseña: {
        type: String,
        requiered: true
    },
    rol: {
        type:String,
        enum: ['ADMIN ', 'CLIENT'],
        default: 'CLIENT'
    }
});

const Usuario = mongoose.model('Usuario', usuarioScheam);

model.exports = Usuario;