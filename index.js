import { initServer } from './config/app.js'
import { connect } from './config/mongo.js'
const Server = require('./models/server');
require('dotenv').config();
const server = new Server();
server.listen();


initServer()
connect()