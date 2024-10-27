import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css';

const Reports = () => {
  const [progressByProject, setProgressByProject] = useState([]);
  const [defectsByPriority, setDefectsByPriority] = useState([]);
  const [executionsByUser, setExecutionsByUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgressByProject();
    fetchDefectsByPriority();
    fetchExecutionsByUser();
  }, []);

  const fetchProgressByProject = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/reports/progress-by-project');
      setProgressByProject(response.data);
    } catch (error) {
      setError("Error loading project progress report");
    }
  };

  const fetchDefectsByPriority = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/reports/defects-by-priority');
      setDefectsByPriority(response.data);
    } catch (error) {
      setError("Error loading defects priority report");
    }
  };

  const fetchExecutionsByUser = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/reports/executions-by-user');
      setExecutionsByUser(response.data);
    } catch (error) {
      setError("Error loading executions by user report");
    }
  };

  return (
    <div className="reports-container">
      <h1>Informes de Progreso de Pruebas y Defectos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Progreso de Pruebas por Proyecto</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Total de Casos</th>
            <th>Ejecutados</th>
            <th>Satisfactorios</th>
            <th>Fallidos</th>
          </tr>
        </thead>
        <tbody>
          {progressByProject.map((item) => (
            <tr key={item.project_id}>
              <td>{item.project_name}</td>
              <td>{item.total_cases}</td>
              <td>{item.executed_cases}</td>
              <td>{item.satisfactory}</td>
              <td>{item.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Defectos por Prioridad y Proyecto</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Estado</th>
            <th>Severidad</th>
            <th>Prioridad</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {defectsByPriority.map((item) => (
            <tr key={`${item.project_id}-${item.status}-${item.priority}`}>
              <td>{item.project_name}</td>
              <td>{item.status}</td>
              <td>{item.severity}</td>
              <td>{item.priority}</td>
              <td>{item.defect_count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ejecuciones de Pruebas por Usuario</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Total de Ejecuciones</th>
            <th>Satisfactorias</th>
            <th>Fallidas</th>
          </tr>
        </thead>
        <tbody>
          {executionsByUser.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_name}</td>
              <td>{user.executions_count}</td>
              <td>{user.satisfactory}</td>
              <td>{user.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
