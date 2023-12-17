import {io} from 'socket.io-client';
const SERVER_URL = 'http://192.168.3.2:8000';
const socket = io(SERVER_URL, {
  autoConnect: false,
});

export default socket;
