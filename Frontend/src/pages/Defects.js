// src/pages/Defects.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Defects = () => {
  const [defects, setDefects] = useState([]);
  const [resources, setResources] = useState([]);
  const [newDefect, setNewDefect] = useState({
    test_case_id: '',
    reported_by: '',
    assigned_to: '',
    status: 'Abierto',
    severity: '',
    priority: '',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // Fetch Defects
  const fetchDefects = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/defectRoutes', config);
      setDefects(response.data);
    } catch (err) {
      setError('Error al obtener los defectos');
    }
  };

  // Fetch Resources
  const fetchResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/resources', config);
      setResources(response.data);
    } catch (err) {
      setError('Error al obtener los recursos');
    }
  };

  useEffect(() => {
    fetchDefects();
    fetchResources();
  }, []);

  const handleInputChange = (e) => {
    setNewDefect({
      ...newDefect,
      [e.target.name]: e.target.value
    });
  };

  const handleNewDefect = () => {
    setNewDefect({
      test_case_id: '',
      reported_by: '',
      assigned_to: '',
      status: 'Abierto',
      severity: '',
      priority: '',
      description: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditDefect = (defect) => {
    setNewDefect({
      test_case_id: defect.test_case_id,
      reported_by: defect.reported_by,
      assigned_to: defect.assigned_to,
      status: defect.status,
      severity: defect.severity,
      priority: defect.priority,
      description: defect.description
    });
    setSelectedDefect(defect);
    setEditMode(true);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/defectRoutes/${selectedDefect.defect_id}`, newDefect, config);
      } else {
        await axios.post('http://46.183.114.118:4000/api/defectRoutes', newDefect, config);
      }
      fetchDefects();
      setShowModal(false);
    } catch (err) {
      setError(editMode ? 'Error al editar el defecto' : 'Error al crear el defecto');
    }
  };

  const handleDeleteDefect = async (defectId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/defectRoutes/${defectId}`, config);
      fetchDefects();
    } catch (err) {
      setError('Error al eliminar el defecto');
    }
  };

  return (
    <div className="projects-container">
      <h1>Gestión de Defectos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className="new-project-button" onClick={handleNewDefect}>
        <i className="fas fa-plus-circle"></i> Nuevo Defecto
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>ID de Caso de Prueba</th>
            <th>Reportado por</th>
            <th>Asignado a</th>
            <th>Estado</th>
            <th>Severidad</th>
            <th>Prioridad</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {defects.map((defect) => (
            <tr key={defect.defect_id}>
              <td>{defect.test_case_id}</td>
              <td>{resources.find(r => r.resource_id === defect.reported_by)?.resource_name}</td>
              <td>{resources.find(r => r.resource_id === defect.assigned_to)?.resource_name}</td>
              <td>{defect.status}</td>
              <td>{defect.severity}</td>
              <td>{defect.priority}</td>
              <td>{defect.description}</td>
              <td>
                <button className="action-button edit-button" onClick={() => handleEditDefect(defect)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="action-button delete-button" onClick={() => handleDeleteDefect(defect.defect_id)}>
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Crear/Editar Defecto */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? 'Editar Defecto' : 'Nuevo Defecto'}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>ID de Caso de Prueba:</label>
              <input
                type="text"
                name="test_case_id"
                value={newDefect.test_case_id}
                onChange={handleInputChange}
                required
              />

              <label>Reportado por:</label>
              <select
                name="reported_by"
                value={newDefect.reported_by}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un usuario</option>
                {resources.map((resource) => (
                  <option key={resource.resource_id} value={resource.resource_id}>
                    {resource.resource_name}
                  </option>
                ))}
              </select>

              <label>Asignado a:</label>
              <select
                name="assigned_to"
                value={newDefect.assigned_to}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un usuario</option>
                {resources.map((resource) => (
                  <option key={resource.resource_id} value={resource.resource_id}>
                    {resource.resource_name}
                  </option>
                ))}
              </select>

              <label>Estado:</label>
              <select
                name="status"
                value={newDefect.status}
                onChange={handleInputChange}
                required
              >
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
              </select>

              <label>Severidad:</label>
              <select
                name="severity"
                value={newDefect.severity}
                onChange={handleInputChange}
                required
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>

              <label>Prioridad:</label>
              <select
                name="priority"
                value={newDefect.priority}
                onChange={handleInputChange}
                required
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>

              <label>Descripción:</label>
              <textarea
                name="description"
                value={newDefect.description}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Defecto'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Defects;
