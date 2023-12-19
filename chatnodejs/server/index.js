import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import https from 'https'
import fs from 'fs'
import path from 'path'
const privateKeyPath = path.join(process.cwd(), 'private-key.pem');
const certificatePath = path.join(process.cwd(), 'certificate.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const credentials = { key: privateKey, cert: certificate };


const port = process.env.SERVER_PORT ?? 8000;

const app = express()
// creamos el servidor http
const server = createServer(app)
// const server = https.createServer(credentials ,app)
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: {}
    },
    cors: {
        origin: '*'
    },
})

// base de datos provisional:
// const users = [{ id: 1, ip: '::ffff:192.168.3.2', username: 'admin', password: 'admin' }];

// ----------------------- SOCKET
let conectedUsers = [];
io.on('connection', (socket) => {
    // ----------
    const userCredentials = {
        ip: socket.handshake.address,
        id: socket.id
    }

    socket.data = userCredentials

    const currentRoom = '';
    // ----------

    console.log(`User ${socket.data.ip} has connected`)
    // console.log(`Connected clientes: ${io.engine.clientsCount}`)


    // get ip
    socket.on('getIp', () => {
        // console.log('auth: ', socket.handshake.auth)
        socket.emit('socketIP', socket.data.ip)
    })

    socket.on('user data', ({ username }) => {
        socket.data = {
            ...socket.data,
            username: username ?? socket.handshake.username
        }
        conectedUsers.push(socket.data)
    })

    // emmit when new user is conected
    socket.broadcast.emit('newUser', socket.data, conectedUsers)

    conectedUsers.push(socket.data)
    io.emit('newUser2', conectedUsers)

    // on cliente disconect
    socket.on('disconnect', () => {
        console.log(`User ${userCredentials.ip} disconnected`)
    })

    // enter some rooms
    socket.on('move to room', room => {
        socket.leave(currentRoom)
        socket.currentRoom = room
        socket.join(room)
    })

    socket.on('message to room', async data => {
        const messageData = { ...socket.data, message: data.message, username: socket.handshake.auth.username }

        const messageDataToDb = { message: data.message, username: socket.handshake.auth.username, ip: socket.data.ip }

        io.to(data.room).emit('my message', messageData)

        await fetch('http://localhost:3000/generalChat', {
            method: 'POST',
            body: JSON.stringify(messageDataToDb),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            console.log(data.room, 'saved')
        })
            .catch(() => console.log(messageData.room, 'error'))
    })

    socket.on('leave to room', room => {
        socket.currentRoom = ''
        socket.leave(room)
    })

    // log log
    socket.on('log data', () => {
        console.log('my cliente data: ', socket.data, socket.handshake.auth)
    })

    // ------------------- messages
    // when user send a message in general chat
    socket.on('my message', (msg) => {
        io.emit('my message', msg)
    })



    // ver eventos
    socket.onAny((event, ...args) => {
        console.log('Event: ', event, args);
    });

})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    // cwd -> es el directorio desde donde se ha inicializado el proyecto = chatnodejs
    res.sendFile(process.cwd() + '/client/index.html')
})

// ---------------- LOGIN
let users = []
app.post('/verify', async (req, res, next) => {
    // user from body
    const user = await req.body

    const userInDB = (await fetch('http://localhost:3000/user'))
    await userInDB.json().then(res => users = res).catch(err => console.log(err))

    const userFound = users.filter(prevUser => prevUser.ip === user.ip)
    if (userFound.length) {

        if (userFound[0].username !== user.username) {
            return res.status(404).json({ error: `( ｡ •̀ ᴖ •́ ｡) ➠ User ${user.username} with IP: ${user.ip} not exist in DB` });
        }

        if (userFound[0].password !== user.password) {
            return res.status(404).json({ error: `(ง ͠ಥ_ಥ)ง ➠ Incorrect password for user: ${user.username}` });
        }

        return res.status(200).json({ message: true });
    } else {
        console.log('not found', user)
        return res.status(404).json({ error: 'User not foun in DB' });
    }
})

// ----------------  REGISTER
app.post('/register', async (req, res) => {
    const user = await req.body

    // check if user exist
    const response = (await fetch('http://localhost:3000/user'))
    const userInDB = await response.json()

    if (userInDB.filter(prevUser => prevUser.ip === user.ip).length) {
        res.status(400).json({ error: 'User already exist in DB' });
        return
    }

    const newUser = (await fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    })).json().then(res => {
        delete user.password
        console.log('User created: ', user)
        return
    }
    ).catch(err => console.log(err))
    res.status(200).json({ message: true });
})

// GENERAL CHAT
app.get('/generalChat', async (req, res) => {
    const response = (await fetch('http://localhost:3000/generalChat')).json()

    response.then(messages => {
        return res.status(200).json({ messages });
    }).catch(err => console.log(err))

})

server.listen(port, () => {
    console.log(`El server está corriendo en el puerto ${port}\n`)
})