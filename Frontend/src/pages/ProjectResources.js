// src/components/ProjectResources.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css'; // Importa el archivo CSS

const ProjectResources = () => {
  const [projectResources, setProjectResources] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    project_id: '',
    resource_id: '',
    assigned_date: '',
    role_in_project: ''
  });
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const formatDate = (dateString, format = 'mm/dd/yyyy') => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (format === 'mm/dd/yyyy') {
      return `${day}/${month}/${year}`;
    } else if (format === 'yyyy-MM-dd') {
      return `${year}-${month}-${day}`;
    }
  };

  useEffect(() => {
    fetchProjectResources();
    fetchProjects();
    fetchResources();
  }, []);

  const fetchProjectResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/projectResouce', config);
      setProjectResources(response.data);
    } catch (err) {
      setError('Error al obtener las asignaciones de recursos');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/projects', config);
      setProjects(response.data);
    } catch (err) {
      setError('Error al obtener los proyectos');
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/resources', config);
      setResources(response.data);
    } catch (err) {
      setError('Error al obtener los recursos');
    }
  };

  const handleInputChange = (e) => {
    setNewAssignment({
      ...newAssignment,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrEditResource = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/projectResouce/${newAssignment.project_resource_id}`, newAssignment, config);
      } else {
        await axios.post('http://46.183.114.118:4000/api/projectResouce', newAssignment, config);
      }
      fetchProjectResources();
      setShowModal(false);
      setEditMode(false);
      setNewAssignment({
        project_id: '',
        resource_id: '',
        assigned_date: '',
        role_in_project: ''
      });
    } catch (error) {
      console.error('Error al asignar recurso:', error);
    }
  };

  const handleEditAssignment = (assignment) => {
    setNewAssignment({
      project_resource_id: assignment.project_resource_id,
      project_id: assignment.project_id,
      resource_id: assignment.resource_id,
      assigned_date: assignment.assigned_date ? formatDate(assignment.assigned_date, 'yyyy-MM-dd') : '',
      role_in_project: assignment.role_in_project
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/projectResouce/${assignmentId}`, config);
      fetchProjectResources();
    } catch (error) {
      console.error('Error al eliminar la asignación de recurso:', error);
    }
  };

  return (
    <div className="projects-container">
      <h1>Asignaciones de Recursos a Proyectos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="new-project-button" onClick={() => {
        setShowModal(true);
        setEditMode(false);
        setNewAssignment({
          project_id: '',
          resource_id: '',
          assigned_date: '',
          role_in_project: ''
        });
      }}>
        Asignar Nuevo Recurso
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>NOMBRE</th>
            <th>Recurso</th>
            <th>Fecha de Asignación</th>
            <th>Rol en el Proyecto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projectResources.map((assignment) => (
            <tr key={assignment.project_resource_id}>
              <td>{assignment.project_id}</td>
              <td>{assignment.project_name}</td>
              <td>{assignment.resource_id}</td>
              <td>{assignment.assigned_date ? formatDate(assignment.assigned_date, 'mm/dd/yyyy') : ''}</td>
              <td>{assignment.role_in_project}</td>
              <td>
                <button classNassName="action-button edit-button" title="Editar"onClick={() => handleEditAssignment(assignment)}>
                <i className="fas fa-edit"></i> {/* Solo el icono de editar */}
                </button>
                <button className="action-button delete-button" title="Eliminar" onClick={() => handleDeleteAssignment(assignment.project_resource_id)}>
                <i className="fas fa-trash-alt"></i> {/* Solo el icono de eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? 'Editar Asignación de Recurso' : 'Asignar Recurso a Proyecto'}</h2>
            <form onSubmit={handleAddOrEditResource}>
              <label>Proyecto:</label>
              <select name="project_id" value={newAssignment.project_id} onChange={handleInputChange} required>
                <option value="">Seleccione un Proyecto</option>
                {projects.map((project) => (
                  <option key={project.project_id} value={project.project_id}>{project.project_name}</option>
                ))}
              </select>

              <label>Recurso:</label>
              <select name="resource_id" value={newAssignment.resource_id} onChange={handleInputChange} required>
                <option value="">Seleccione un Recurso</option>
                {resources.map((resource) => (
                  <option key={resource.resource_id} value={resource.resource_id}>{resource.resource_name}</option>
                ))}
              </select>

              <label>Fecha de Asignación:</label>
              <input
                type="date"
                name="assigned_date"
                value={newAssignment.assigned_date}
                onChange={handleInputChange}
                required
              />

              <label>Rol en el Proyecto:</label>
              <input
                type="text"
                name="role_in_project"
                value={newAssignment.role_in_project}
                onChange={handleInputChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit">{editMode ? 'Guardar Cambios' : 'Asignar Recurso'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectResources;
