import axios from 'axios';

// Cria a instância do Axios com configurações globais
const api = axios.create({
  baseURL: 'http://127.0.0.1:5555', // URL de acesso à API local
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em cada requisição
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros globais
api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Erro na requisição:', error.response);
      return Promise.reject(error);
    }
  );
  
export default api;