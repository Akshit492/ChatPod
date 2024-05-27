import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  timeout: 10000, // Adjust as needed
});

export default api;