// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081', // Replace with your backend server's URL
  timeout: 10000, // Optional timeout
});

export default instance;
