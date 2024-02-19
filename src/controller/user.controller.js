'use strict'
const Usuario = require('../models/user.model.js');

//Obtener los usuarios
const obtenerUsuario = async (req, res)=>{
    try{

    }catch(err){
        console.error(err)
        res.status(500).json({
            message: 'Ocurrio un error al obtener los usuarios'
        });
    }
};


//Crear usuario
const crearUsuario = async (req,res)=>{
    try{
        const nuevoUsuario 
    }catch(err  ){
        console.error(err)
        res.status(500).json({message: 'Ocurrio un error al crear usuario'});
    }

}