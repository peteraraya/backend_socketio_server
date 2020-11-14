// Todo lo necesario para crear nuestro socket
const express  = require('express');
// Servidor de sockets
const http     = require('https');
// Socket server
const socketio = require('socket.io');
// path
const path     = require('path');
// cors --> es un middleware
const cors     = require('cors');

const Sockets = require('./sockets');

class Server {
  // propiedades que tendrá este Server

  constructor() {
    // Servidor de express
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /** configuraciones */
    });
  }

  // Middleware : aquí pondremos todos nuestros middleware que vamos a utilizar
  middlewares() {
    
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    // Cors
    this.app.use(cors() );

  }
  // Configurar sockets
  configurarSockets() {
     new Sockets(this.io);
  }

  // Metodo encargado de inicializar la app
  execute() {
    // inicializar al middleware
    this.middlewares();

    // inicializamos las configuraciones de sockets
    this.configurarSockets();

    // inicializar el server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en el puerto :", this.port);
    });
  }
}

module.exports = Server;
