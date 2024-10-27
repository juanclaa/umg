import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const ResourceManager = () => {
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    resource_name: '',
    role: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/resources', config);
      setResources(response.data);
    } catch (err) {
      setError('Error al obtener los recursos:');
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleInputChange = (e) => {
    setCurrentResource({
      ...currentResource,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrEditResource = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/resources/${currentResource.resource_id}`, currentResource, config);
      } else {
        await axios.post('http://46.183.114.118:4000/api/resources/', currentResource, config);
      }
      fetchResources();
      setShowModal(false);
      setEditMode(false);
      setCurrentResource({ resource_name: '', role: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error al guardar el recurso1:',  error.response?.data || error.message);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/resources/${resourceId}`, config);
      fetchResources();
    } catch (error) {
      console.error('Error al eliminar el recurso:', error);
    }
  };

  const handleEditResource = (resource) => {
    setCurrentResource(resource);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="projects-container">
      <h1>Administración de Recursos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="new-project-button" onClick={() => {
        setShowModal(true);
        setEditMode(false);
        setCurrentResource({ resource_name: '', role: '', email: '', phone: '' });
      }}>
        Nuevo Recurso
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.resource_id}>
              <td>{resource.resource_name}</td>
              <td>{resource.role}</td>
              <td>{resource.email}</td>
              <td>{resource.phone}</td>
              <td>
                <button className="action-button" title="Editar" onClick={() => handleEditResource(resource)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="action-button" title="Eliminar" onClick={() => handleDeleteResource(resource.resource_id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? 'Editar Recurso' : 'Nuevo Recurso'}</h2>
            <form onSubmit={handleAddOrEditResource}>
              <label>Nombre del Recurso:</label>
              <input
                type="text"
                name="resource_name"
                value={currentResource.resource_name}
                onChange={handleInputChange}
                required
              />

              <label>Rol:</label>
              <input
                type="text"
                name="role"
                value={currentResource.role}
                onChange={handleInputChange}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={currentResource.email}
                onChange={handleInputChange}
              />

              <label>Teléfono:</label>
              <input
                type="text"
                name="phone"
                value={currentResource.phone}
                onChange={handleInputChange}
              />

              <div className="modal-buttons">
                <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Recurso'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManager;
