import axios from 'axios';

const ApiConfig = axios.create({
  baseURL: 'http://3.22.173.242:3000',
  headers: {
    'Content-Type': 'application/json',
    jwt: localStorage.getItem('token'),
  },
});

export default ApiConfig;
