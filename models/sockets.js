// Archivo utilizado para segmentar toda la logica de nuestros sockets

// Con está clase tendremos control de todos los clientes que se vallan conectando
class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
   
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            // Escuchando Evento  mensaje-emit-server
            socket.on('mensaje-emit-server', (data) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            });
        });
    }

}

module.exports = Sockets;