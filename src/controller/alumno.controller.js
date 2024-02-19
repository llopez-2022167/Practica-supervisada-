'user strict'//Modo estrcito

import Alumno from '../models/alumno.model.js'
import { excrypt, checkPassword, checkUpdate } from '../utils/validator.js'


const bcrypt = requ('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../controller/user.controller.js');
const Curso = require('../Curso/curso.js');

const { response } = require('express');

//Resgistrase o un tipo get
const crearAlumno = async (req, res) =>{
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
    }
};

//Verificación de usuario para cuando quiera volver a entrar
//Asincronia
const login = async(req, res) =>{
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

const obteberAlumnoPorId = async (req, res)=>{
    try{
        const alumno = await Alumno.findById(req.parmas.id);
        if(!alumno){
            return res.status(404).json({message: 'Alumno no encontrado'});
        }
        res.json(alumno);
    }catch(error){
        register.status(500).json({message: 'Ocurrio un error al obtener el alumno'});

    }
};

const actualizarAlumno = async (req, res) =>{
    try{
        await Alumno.findByIdAndUpdate(req.parmas.id, req.body);
        res.json({message: 'Alumno actualizado correctamente'});
    }catch(err){
        console.error(err)
        res.status(500).json({medssage: 'ocurrio un error al actualizar el alumno'});
    }

};

//Eliminar el alumno por el ID
const eliminarAlumno = async(req, res)=>{
    try{
        await Alumno.findByIdAndDelete(req.parmas.id);
        res.json({message: 'Alumno eliminado correctamente'});
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Ocurrió un error al eliminar el usuario'});
    }

};