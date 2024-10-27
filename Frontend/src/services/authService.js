import axios from 'axios';

const API_URL = 'http://46.183.114.118:4000/api/users';

// Servicio para registrar un usuario
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Servicio para iniciar sesión
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
  }
  return response.data;
};

// Servicio para cerrar sesión
const logout = () => {
  localStorage.removeItem('token');
};

export { register, login, logout };
