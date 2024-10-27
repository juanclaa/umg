import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    project_name: '',
    description: '',
    status: '',
    start_date: '',
    end_date: ''
  });

  const [newAssignment, setNewAssignment] = useState({
    project_id: '',
    resource_id: '',
    assigned_date: '',
    role_in_project: ''
  });

  const [newTaskAssignment, setNewTaskAssignment] = useState({
    project_id: '',
    task_name: '',
    description: '',
    assigned_to: '',
    start_date: '',
    due_date: '',
    status: 'Not Started'
  });


  const [resources, setResources] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false); // Estado para mostrar la modal de recursos
  const [error, setError] = useState(null);
  const [resourceName, setResourceName] = useState(''); // Nombre del recurso a asignar

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
  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de incluir el `project_id` en `newTaskAssignment`
      const taskData = {
        ...newTaskAssignment,
        project_id: selectedProject.project_id
      };
      
      // Llamada a la API para crear la nueva tarea asignada al recurso
      await axios.post('http://46.183.114.118:4000/api/tasks', taskData, config);
      
      console.log('Tarea asignada con éxito');
      
      // Cerrar el modal de asignación de tareas y resetear el estado
      setShowTaskModal(false);
      setNewTaskAssignment({
        project_id: '',
        task_name: '',
        description: '',
        assigned_to: '',
        start_date: '',
        due_date: '',
        status: 'Not Started'
      });
      
      // Opcional: Recargar la lista de proyectos/tareas si es necesario
      fetchProjects();
    } catch (error) {
      console.error('Error al asignar tarea:', error);
      setError('Error al asignar la tarea');
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

  useEffect(() => {
    fetchProjects();
    fetchResources();
  },[]);

  
  const fetchResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/resources', config);
      setResources(response.data);
    } catch (err) {
      setError('Error al obtener los recursos');
    }
  };


  




  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      
                await axios.post('http://46.183.114.118:4000/api/projectResouce', newAssignment, config);
    
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

  const handleInputChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    });
  };

  const handleNewProject = () => {
    setNewProject({
      project_name: '',
      description: '',
      status: '',
      start_date: '',
      end_date: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setNewProject({
      project_name: project.project_name,
      description: project.description,
      status: project.status,
      start_date: project.start_date ? formatDate(project.start_date, 'yyyy-MM-dd') : '',
      end_date: project.end_date ? formatDate(project.end_date, 'yyyy-MM-dd') : ''
    });
    setSelectedProject(project);
    setEditMode(true);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/projects/${selectedProject.project_id}`, newProject, config);
      } else {
        await axios.post('http://46.183.114.118:4000/api/projects', newProject, config);
      }
      fetchProjects();
      setShowModal(false);
    } catch (err) {
      setError(editMode ? 'Error al editar el proyecto' : 'Error al crear el proyecto');
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/projects/${projectId}`, config);
      fetchProjects();
    } catch (err) {
      setError('Error al eliminar el proyecto');
    }
  };

  const handleOpenTaskModal = (project) => {
    setSelectedProject(project); // Guarda el proyecto seleccionado en el estado
    setShowTaskModal(true); // Muestra el modal de asignación de tareas
  };
  // Función para abrir la modal de recursos
  const handleOpenResourceModal = (project) => {
    setSelectedProject(project);
    setShowResourceModal(true);
  };

  // Función para cerrar la modal de recursos
  const handleCloseResourceModal = () => {
    setShowResourceModal(false);
    setSelectedProject(null);
    setResourceName('');
  };

 

  return (
    <div className="projects-container">
      <h1>Gestión de Proyectos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className="new-project-button" onClick={handleNewProject}>
        <i className="fas fa-plus-circle"></i> Nuevo Proyecto
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>Descripción</th>
            <th>Status</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.project_id}>
              <td>{project.project_name}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>{project.start_date ? formatDate(project.start_date, 'mm/dd/yyyy') : ''}</td>
              <td>{project.end_date ? formatDate(project.end_date, 'mm/dd/yyyy') : ''}</td>
              <td>
                <button className="action-button" title="Editar" onClick={() => handleEditProject(project)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="action-button" title="Eliminar" onClick={() => handleDeleteProject(project.project_id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button className="action-button" title="Agregar Recursos" onClick={() => handleOpenResourceModal(project)}>
                  <i className="fas fa-users"></i>
                </button>
                <button className="action-button" title="Agregar Tareas" onClick={() => handleOpenTaskModal(project)}>
                  <i className="fas fa-tasks"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Crear/Editar Proyecto */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Nombre del Proyecto:</label>
              <input type="text" name="project_name" value={newProject.project_name} onChange={handleInputChange} required />
              <label>Descripción:</label>
              <textarea name="description" value={newProject.description} onChange={handleInputChange} required />
              <label>Status:</label>
              <input list="status-options" name="status" value={newProject.status} onChange={handleInputChange} required />
              <datalist id="status-options">
                <option value="No Iniciado"></option>
                <option value="En Progreso"></option>
                <option value="Completado"></option>
                <option value="Detenido"></option>
              </datalist>
              <label>Fecha de Inicio:</label>
              <input type="date" name="start_date" value={newProject.start_date} onChange={handleInputChange} required />
              <label>Fecha de Fin:</label>
              <input type="date" name="end_date" value={newProject.end_date} onChange={handleInputChange} required />
              <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Proyecto'}</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

     {/* Modal para Agregar Recursos */}
{showResourceModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Agregar Recursos al Proyecto: {selectedProject?.project_name}</h2>
      <form onSubmit={handleAddResource}>
        <label>Recurso:</label>
        <select
          name="resource_id"
          value={newAssignment.resource_id}
          onChange={(e) => setNewAssignment({
            ...newAssignment,
            resource_id: e.target.value,
            project_id: selectedProject.project_id  // Guardamos project_id del proyecto seleccionado
          })}
          required
        >
          <option value="">Seleccione un recurso</option>
          {resources.map((resource) => (
            <option key={resource.resource_id} value={resource.resource_id}>
              {resource.resource_name}
            </option>
          ))}
        </select>

        <label>Fecha de Asignación:</label>
        <input
          type="date"
          name="assigned_date"
          value={newAssignment.assigned_date}
          onChange={(e) => setNewAssignment({
            ...newAssignment,
            assigned_date: e.target.value
          })}
          required
        />

        <label>Rol en el Proyecto:</label>
        <input
          type="text"
          name="role_in_project"
          value={newAssignment.role_in_project}
          onChange={(e) => setNewAssignment({
            ...newAssignment,
            role_in_project: e.target.value
          })}
          placeholder="Ingrese el rol en el proyecto"
          required
        />

        <button type="submit">Añadir Recurso</button>
        <button type="button" onClick={handleCloseResourceModal}>Cancelar</button>
      </form>
    </div>
  </div>
)}

{/* Modal para Asignar Tareas */}
{showTaskModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Asignar Tarea al Proyecto: {selectedProject?.project_name}</h2>
      <form onSubmit={handleAssignTask}>
        <label>Nombre de la Tarea:</label>
        <input
          type="text"
          name="task_name"
          value={newTaskAssignment.task_name}
          onChange={(e) => setNewTaskAssignment({
            ...newTaskAssignment,
            task_name: e.target.value
          })}
          required
        />

        <label>Descripción:</label>
        <textarea
          name="description"
          value={newTaskAssignment.description}
          onChange={(e) => setNewTaskAssignment({
            ...newTaskAssignment,
            description: e.target.value
          })}
        />

        <label>Recurso Asignado:</label>
        <select
          name="assigned_to"
          value={newTaskAssignment.assigned_to}
          onChange={(e) => setNewTaskAssignment({
            ...newTaskAssignment,
            assigned_to: e.target.value
          })}
          required
        >
          <option value="">Seleccione un recurso</option>
          {resources.map((resource) => (
            <option key={resource.resource_id} value={resource.resource_id}>
              {resource.resource_name}
            </option>
          ))}
        </select>

        <label>Fecha de Inicio:</label>
        <input
          type="date"
          name="start_date"
          value={newTaskAssignment.start_date}
          onChange={(e) => setNewTaskAssignment({
            ...newTaskAssignment,
            start_date: e.target.value
          })}
        />

        <label>Fecha de Vencimiento:</label>
        <input
          type="date"
          name="due_date"
          value={newTaskAssignment.due_date}
          onChange={(e) => setNewTaskAssignment({
            ...newTaskAssignment,
            due_date: e.target.value
          })}
        />

        <label>Estado:</label>
        <select
          name="status"
          value={newTaskAssignment.status}
          onChange={(e) => setNewTaskAssignment({
            ...newTaskAssignment,
            status: e.target.value
          })}
          required
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delayed">Delayed</option>
        </select>

        <button type="submit">Asignar Tarea</button>
        <button type="button" onClick={() => setShowTaskModal(false)}>Cancelar</button>
      </form>
    </div>
  </div>
)}


{/*ultmo*/ }
    </div>
  );
};

export default Projects;
