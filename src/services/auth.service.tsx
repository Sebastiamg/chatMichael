import axios from 'axios';
import {UserData} from '../interaces/userData.interface';

let BASE_URL = 'http://192.168.3.2:8000';

export function setBASE_URL(ip: string) {
  BASE_URL = `http://${ip}:8000`;
  return BASE_URL;
}

function Verify(user: UserData) {
  return axios.post(BASE_URL.concat('/verify'), user);
}

function Register(user: UserData) {
  return axios.post(BASE_URL.concat('/register'), user);
}

function GetGeneralChatMsgs() {
  return axios.get(BASE_URL.concat('/generalChat'));
}

export {Verify, Register, GetGeneralChatMsgs};
