import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default clienteAxios;