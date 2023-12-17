import express from "express";
import bodyParser from "body-parser";
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const port = process.env.SERVER_PORT ?? 8000;

const app = express()
// creamos el servidor http
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: {}
    },
    cors: {
        origin: "*"
    }
})

// base de datos provisional:
// const users = [{ id: 1, ip: '::ffff:192.168.3.2', username: 'admin', password: 'admin' }];

io.on('connection', (socket) => {

    console.log(`User ${socket.id} has connected`)
    console.log(`Connected clientes: ${io.engine.clientsCount}`)

    console.log(socket.handshake.address, ' conectado')

    // get ip
    socket.on('getIp', () => {
        io.emit('socketIP', socket.handshake.address)
    })

    // emmit new user conection with his info
    io.emit('newUser', { id: socket.id, ip: socket.handshake.address })


    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)
    })

    socket.on('my message', (msg) => {
        io.emit('my message', msg)
    })

})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    // cwd -> es el directorio desde donde se ha inicializado el proyecto = chatnodejs
    res.sendFile(process.cwd() + '/client/index.html')
})

let users = []
app.post('/verify', async (req, res, next) => {
    // user from body
    const user = await req.body

    const userInDB = (await fetch('http://localhost:3000/user'))
    await userInDB.json().then(res => users = res).catch(err => console.log(err))

    if (users.filter(prevUser => prevUser.ip === user.ip).length) {
        res.status(200).json({ message: true });
    } else {
        console.log("not found", user)
        next(new Error('User not found in DB'))
    }
})

app.post('/register', async (req, res) => {
    const user = await req.body
    console.log(user)

    console.log("estoy mandando esta data: ", user)
    const newUser = (await fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    })).json()

    console.log('User created', newUser)

})


server.listen(port, () => {
    console.log(`El server está corriendo en el puerto ${port}\n`)
})