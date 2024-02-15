'user strict'//Modo estrcito

import Alumno from './alumno.model.js'
import { excrypt, checkPassword, checkUpdate } from '../utils/validator.js'
const bcrypt = requ('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Usuario/user.controller.js')


exports.register = async (req, res) =>{
    try{
        //Validar si el usuario ya existe
        const existeUsuario = await Usuario.findOne({email: req.body.email})
        if(existeUsuario){
            return res.status(400).json({message: 'El usuario ya esta registrado '})
        }
        //Hash de la contraseña
        const heashedPassword = await bcrypt.hash(req.body.password, 10)
        //Se crea el nuevo usuario
        const usuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: heashedPassword,
            rol: req.body.rol || 'STUDENT_ROLE' //Por defecto es estudiante
        });

        await usuario.save();
    
        res.status(201).json({medssage: 'usuario registrado correctamente nice pa'});
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Error al resgistrar usuario'})
    };
}

//Asincronia
exports.login = async(req, res) =>{
    try{
        //Buscar usurairo por email
        const usuario = await Usuario.findOne({email: req.body.email});
        if(!usuario){
            return res.status(404).json({message: ' Usuario no encontrado '});
        }
        //Verificación de contraseña
         const validPssword = await bcrypt.compare(req.body.password, usuario.password);
        if(!validPssword){
            return res.status(401).json({message: 'Contraseña incorrecta'});
        }
        //Generar Token JWT
        const token = jwt.sign({
            id: usuario._id,
            rol: usuario.rol
        }, 'secreto');
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Error al iniciar seción'});
    }
};