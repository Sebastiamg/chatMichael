import axios from 'axios';
import {UserData} from '../interaces/userData.interface';

const BASE_URL = 'http://192.168.3.2:8000';

function Verify(user: UserData) {
  return axios.post(BASE_URL.concat('/verify'), user);
}

function Register(user: UserData) {
  return axios.post(BASE_URL.concat('/register'), user);
}

export {Verify, Register};
