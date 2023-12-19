import {io} from 'socket.io-client';

let SERVER_URL = 'http://192.168.3.2:8000';

export function setSERVER_URL(ip: string) {
  SERVER_URL = `http://${ip}:8000`;
  return SERVER_URL;
}

const socket = io(SERVER_URL, {
  autoConnect: false,
});

export default socket;
