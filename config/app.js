'use strict'

//Importaciones 
import express  from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv' 
import profesorRoutes from '../src/Profesor/profesor.routes.js'
import alumnoRoutes from '../src/Alumno/alumno.routes.js'

//Configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//Configuracion del servidor : false
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())//Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet())//Aplica capa de seguridad básica al servidor
app.use(morgan('dev'))//Logs de solicitudes al servidor HTTP

//Declaración de rutas
app.use(profesorRoutes)
app.use('/alumno', alumnoRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}

