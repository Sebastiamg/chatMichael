<!-- CREACIÓN DEL SERVIDOR -->

- creamos el servidor de express
    + const app = express()

- creamos el servidor http que usa un server de express
    + const server = createServer(app)

- creamos nuestro servidor de sockets que usa un server http
    + const io = new Server(server)

<!-- CREACIÓN DEL CLIENTE -->
const socket = io()


<!-- SERVIDOR ESCUCHANDO EVENTOS -->

io.on('connection', socket => {
    // el socket es el cliente que se ha conectado
    // podemos crear eventos en base al cliente conectado
    // podemos escuchat un evento de desconección del cliente

    socket.on('disconnected', () => {
        console.log('el cliente: ', socket.id, 'se ha dessconetado')
    })

})

<!-- SERVIDOR MANDANDO EVENTOS HACIA EL CLIENTE -->
io.on('connection', () => {
    // podemos enviar eventos hacia el cliente
    io.emit('my event', 'from server')
})

// El cliente deberá tener un método para escuchat eventos
socket.on('my event', data => {
    cosole.log(data) -> from server
})

<!-- CLIENTE MANDANDO EVENTOS HACIA EL SERVIDOR -->
socket.emit('my event 2', 'from client xd')

// El servidor deberá escuchar los eventos que mandan desde el cliente
io.on('conection', socket => {
    socket.on('my event 2', data => {
        console.log(data) -> from client xd
    })
})

<!-- GLOSARIO -->
io.on('evento') -> el servidor escucha un evento

[servidor]
io.on('conection' socket => {
    socket.id                   -> id del cliente
    socket.handshake.adress     -> ip del cliente
    io.engine.clientsCount      -> cancidad de clientes conectados


    // EMISION DE EVENTOS
    socket.emit('evento', data) -> para mandar a un cliente o un server
    io.emit('evento', data)     -> para mandar a todos los clientes
    socket.to('id').emit('evt', data)   -> mensaje a un socket encontrado por su id

    // ESCUCHAR EVENTOS CON -> ON - ONCE  - OFF
    socket.on('evt', clb())     -> con varios emits este escuchará a todos
    socket.once('evt', clb())   -> con varios emits este escuchará solo a uno
    socket.off('evt, funName()) -> podemos dejar de escuchar un evento

    // BROADCAST DE EVENTOS o eventos a los clientes excepto a nosotros mismos
    socket.broadcast.emit('event', data)    

    // SABER LA SALA A LA QUE ESTAMOS CONECTADOS -> debemos crear nuestra propiedad
    socket.conectedRoom = "";
        - si no unimos a una sala podemos actualizar este valor
    
})

<!-- // CONECTARSE A SALAS -->
- tenemos que emitir un evento desde el cliente para conectarnos a una sala dinámiamente
- por defecto estmos conectados a una sala global
:en el cliente
    // dinámicamente podemos definir la sala a la que nos vamos a conectar
    socket.emit('room', '1')

:en el server
    socket.on('room', roomNum => {
        <!-- sacamos al socket de la sala en la que estaba -->
        socket.leave('actual room')
        ... metodo para conectarse dinámicamente como como switch
        <!-- usamos join para poder unirnos a salas -->
        <!-- si no existe la sala esta se crea automáticamente -->
        socket.join('room name')

        // podemos mandar mensajes a la sala que nosotros querramos
        socket.to('roomName').emit('event', 'data')

    })

** ES IMPORTANTE SACAR AL USUARIO DEL SALA PREVIA ANTED DE UNIRLO A OTRA **
    socket.leave('actual room')

<!-- // NAMESPACES -->
- son como grupos en donde nosotros podemos unirnos de acuerdo a algo
- podemos conectarnos a diferentes namespaces en base a una condición
:cliente
* creamos una instancia de io en pero conectandonos a un namespace en base a algo si queremos
* const role = prompt('your role')
let socketNamespace
    if (role === 'admin') {
        socketNamespace = io('/admin')
    } else {
        socketNamespace = io('/admin')
    }
* ahora podemos hacer lo mismo que un socket normal pero con la variable de namespace que creamos
    socketNamespace.on('msg', xd => {
        console.log(xd)
    })

:servidor
* en el servidor tenemos que crear instancias de acuerdo a los namespaces que querramos
const adminNamespace = io.of('admin')
const userNamespace = io.of('user')

* ahora podemos generar o escuchar eventos dentro de los namespaces que tengamos
adminNamespace.on('connected' socket => {
    console.log(socket.id, ' connected')
})


[cliente]
const socket = io();

socket.on('event', callback())  -> escuchat eventos del servidor
socket.emit('event', data)      -> mandar eventos al servidor








<!-- --------------- -->
socket.emit(/* .. */) → Emisión básica.

socket.broadcast.emit(/* .. */) → A todos los clientes del espacio de nombres actual, exceptuando al remitente.

socket.to('room1').emit(/* .. */) → A todos los clientes en room1, excepto al remitente.

socket.to(['room1', 'room2']).emit(/* .. */) → A todos los clientes en room1 y/o room2, excepto al remitente.

socket.compress(false).emit(/* .. */) → Sin compresión.

socket.volatile.emit(/* .. */) → Un mensaje que podría eliminarse si el transporte de bajo nivel no se puede escribir.

socket.emit("question", (answer) => {*...*}); → Con reconocimiento.

io.in('room1').emit(/* .. */) → A todos los clientes en room1.

io.to(['room1', 'room2']).except('room3').emit(/* .. */) → A todos los clientes en room1 y/o room2, excepto aquellos en room3.

io.of('myNamespace').emit(/* .. */) → A todos los clientes en el espacio de nombres “myNamespace”.

io.of('myNamespace').to('room1').emit(/* .. */) → A todos los clientes en room1 en el espacio de nombres “myNamespace”.

io.to(socketId).emit(/* .. */) → A un socket en particular por su ID (mensaje privado).

io.local.emit(/* .. */) → A todos los clientes en este nodo (cuando se tienen múltiples nodos).

io.emit(/* .. */) → A todos los clientes conectados.

Eventos del cliente
socket.emit(/* .. */) → Emisión básica.
socket.emit("question", (answer) => {*...*}); → Con reconocimiento.
socket.compress(false).emit(/* .. */) → Sin compresión.
socket.volatile.emit(/* .. */) → Un mensaje que podría eliminarse si el transporte de bajo nivel no se puede escribir.
Con timeout cuando el receptor no recibió el evento en el tiempo esperado.