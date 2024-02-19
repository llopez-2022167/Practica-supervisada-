//alumno.routes
const express = require('express');
const routes = express.Router();
const alumnocontroller = require('../controller/alumno.controller.js');

//Obtener a todos los alumnos 
routes.get('/alumno.model', alumnocontroller.crearAlumno);

//Crear un nuevo alumno
routes.post('/alumno.model', alumnocontroller.login);

//Obtener un usuario por su ID
routes.get('/alumno.model/:id', alumnocontroller.obteberAlumnoPorId);

//Actualizar un usuario por si ID
routes.put('/alumno.model/:id', alumnocontroller.actualizarAlumno);

//Elimoinar alumno
routes.delete('/alumno.model/:id', alumnocontroller.eliminarAlumno);

module.exports = routes;