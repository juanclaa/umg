// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importamos el archivo CSS

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Ya no es necesario el estado de error si no lo usas

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://46.183.114.118:4000/api/users/login',
        formData,
        {
          withCredentials: true, // Agregamos esta opción
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      // Aquí puedes manejar el error si es necesario
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="icon-container">
          <i className="fas fa-user-circle fa-5x"></i> {/* Icono grande */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i> {/* Icono para username */}
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i> {/* Icono para password */}
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">LOGIN</button> {/* Botón de login */}
            <button type="button" onClick={handleRegister} className="register-button">REGISTRARSE</button> {/* Botón de registro */}
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default Login;
