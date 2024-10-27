// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar el token del localStorage (o sessionStorage si lo usas)
    localStorage.removeItem('token');

    // Opcional: puedes limpiar otros datos del almacenamiento local aquí si los has guardado

    // Redirigir al usuario a la página de login
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>Has cerrado sesión correctamente</h2>
    </div>
  );
};

export default Logout;
