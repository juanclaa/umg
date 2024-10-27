// src/components/TaskManager.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css'; // Importa el archivo CSS

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [showModal, setShowModal] = useState(false); // Controla el modal
  const [editMode, setEditMode] = useState(false); // Modo edición
  const [resources, setResources] = useState([]); // Lista de recursos
  const [currentTask, setCurrentTask] = useState({
    project_id: '',
    milestone_id: '',
    task_name: '',
    description: '',
    assigned_to: '',
    start_date: '',
    due_date: '',
    status: 'Not Started'
  });

  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // Obtener la lista de tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchResources();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value
    });
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

  // Obtener lista de recursos
  const fetchResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/resources', config);
      setResources(response.data);
    } catch (err) {
      setError('Error al obtener los recursos');
    }
  };

  // Crear o actualizar una tarea
  const handleAddOrEditTask = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/tasks/${currentTask.task_id}`, currentTask, config);
      } else {
        await axios.post('http://46.183.114.118:4000/api/tasks', currentTask, config);
      }
      fetchTasks();
      setShowModal(false);
      setEditMode(false);
      setCurrentTask({
        project_id: '',
        milestone_id: '',
        task_name: '',
        description: '',
        assigned_to: '',
        start_date: '',
        due_date: '',
        status: 'Not Started'
      });
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  // Eliminar una tarea
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  // Configurar el formulario para editar
  const handleEditTask = (task) => {
    setCurrentTask({
      ...task,
      start_date: formatDate(task.start_date),
      due_date: formatDate(task.due_date)
    });
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="projects-container"> {/* Usa la clase de contenedor principal */}
      <h1>Administración de Tareas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="new-project-button" onClick={() => { 
        setShowModal(true);
        setEditMode(false);
        setCurrentTask({
          project_id: '',
          milestone_id: '',
          task_name: '',
          description: '',
          assigned_to: '',
          start_date: '',
          due_date: '',
          status: 'Not Started'
        });
      }}>
        Nueva Tarea
      </button>

      <table className="projects-table"> {/* Usa la clase de tabla */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Responsable</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Entrega</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.task_name}</td>
              <td>{task.description}</td>
              <td>{task.assigned_to}</td>
              <td>{task.start_date ? formatDate(task.start_date, 'mm/dd/yyyy') : ''}</td>
              <td>{task.due_date ? formatDate(task.due_date, 'mm/dd/yyyy') : ''}</td>
              <td>{task.sta}</td>
              <td>
                <button className="action-button" title="Editar" onClick={() => handleEditTask(task)}>
                  <i className="fas fa-edit"></i> {/* Solo el icono de editar */}
                </button>
                <button className="action-button" title="Eliminar" onClick={() => handleDeleteTask(task.task_id)}>
                  <i className="fas fa-trash-alt"></i> {/* Solo el icono de eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Crear/Editar Tarea */}
      {showModal && (
        <div className="modal"> {/* Usa la clase del modal */}
          <div className="modal-content"> {/* Usa la clase del contenido del modal */}
            <h2>{editMode ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <form onSubmit={handleAddOrEditTask}>
              <label>Nombre de la Tarea:</label>
              <input
                type="text"
                name="task_name"
                value={currentTask.task_name}
                onChange={handleInputChange}
                required
              />

              <label>Descripción:</label>
              <textarea
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />

              <label>Asignado a:</label>
              <select name="assigned_to" value={currentTask.assigned_to} onChange={handleInputChange} required>
                <option value="">Seleccione un Recurso</option>
                {resources.map((resource) => (
                  <option key={resource.resource_id} value={resource.resource_id}>{resource.resource_name}</option>
                ))}
              </select>

              <label>Fecha de Inicio:</label>
              <input
                type="date"
                name="start_date"
                value={currentTask.start_date}
                onChange={handleInputChange}
              />

              <label>Fecha de Entrega:</label>
              <input
                type="date"
                name="due_date"
                value={currentTask.due_date}
                onChange={handleInputChange}
              />

              <label>Estado:</label>
              <select name="status" value={currentTask.status} onChange={handleInputChange}>
                <option value="Not Started">No Iniciada</option>
                <option value="In Progress">En Progreso</option>
                <option value="Completed">Completada</option>
                <option value="Delayed">Atrasada</option>
              </select>

              <div className="modal-buttons">
                <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Tarea'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
