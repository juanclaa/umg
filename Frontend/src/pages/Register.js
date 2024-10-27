// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './Login.css'; // Importamos el archivo CSS

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'tester' // Valor por defecto
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      navigate('/login'); // Redirigir a la página de login después del registro exitoso
    } catch (error) {
      console.log("Error al registrar el usuario:", error.response); // Mostrar el error del backend
      setError('Error al registrar el usuario');
    }
  };

  // Función para redirigir a login en caso de cancelar
  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="icon-container">
          <i className="fas fa-user-plus fa-5x"></i> {/* Icono de registro */}
        </div>
        <h2>Registrar</h2>
        {error && <p className="error-message">{error}</p>}
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
            <i className="fas fa-envelope"></i> {/* Icono para email */}
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
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
          <div className="input-group">
            <i className="fas fa-user-tag"></i> {/* Icono para role */}
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="tester">Tester</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit" className="register-button">REGISTRAR</button> {/* Botón de registro */}
            <button type="button" onClick={handleCancel} className="cancel-button">CANCELAR</button> {/* Botón de cancelar */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
