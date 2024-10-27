import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';



const Dashboard = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [projectsByStatus, setProjectsByStatus] = useState([]);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const [error, setError] = useState(null);

  // Obtener cantidad de tareas activas
  const fetchTaskCount = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/tasks/count', config);
      setTaskCount(response.data['project_id']);
    } catch (err) {
      setError('Error al obtener el conteo de tareas:');
    }
  };

  // Obtener cantidad de proyectos por estado
  const fetchProjectsByStatus = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/projects/status-count', config);
      setProjectsByStatus(response.data);
    } catch (error) {
      setError('Error al obtener proyectos por estado:');
    }
  };

  useEffect(() => {
    fetchTaskCount();
    fetchProjectsByStatus();
  });

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="dashboard-section">
        <h2>Tareas Activas</h2>
        <p className="task-count">{taskCount}</p>
      </div>

      <div className="dashboard-section">
        <h2>Cantidad de Proyectos por Estado</h2>
        <table className="status-table">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Cantidad de Proyectos</th>
            </tr>
          </thead>
          <tbody>
            {projectsByStatus.map((status, index) => (
              <tr key={index}>
                <td>{status.status}</td>
                <td>{status['count(*)']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

