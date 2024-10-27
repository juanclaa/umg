// src/pages/TestPlans.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const TestPlans = () => {
  const [testPlans, setTestPlans] = useState([]);
  const [newTestPlan, setNewTestPlan] = useState({
    project_id: '',
    plan_name: '',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedTestPlan, setSelectedTestPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Test Plans
  const fetchTestPlans = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/testplans/test-plans');
      setTestPlans(response.data);
    } catch (err) {
      setError('Error al obtener los planes de prueba');
    }
  };

  useEffect(() => {
    fetchTestPlans();
  }, []);

  const handleInputChange = (e) => {
    setNewTestPlan({
      ...newTestPlan,
      [e.target.name]: e.target.value
    });
  };

  const handleNewTestPlan = () => {
    setNewTestPlan({
      project_id: '',
      plan_name: '',
      description: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditTestPlan = (testPlan) => {
    setNewTestPlan({
      project_id: testPlan.project_id,
      plan_name: testPlan.plan_name,
      description: testPlan.description
    });
    setSelectedTestPlan(testPlan);
    setEditMode(true);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/testplans/test-plans/${selectedTestPlan.test_plan_id}`, newTestPlan);
      } else {
        await axios.post('http://46.183.114.118:4000/api/testplans/test-plans', newTestPlan);
      }
      fetchTestPlans();
      setShowModal(false);
    } catch (err) {
      setError(editMode ? 'Error al editar el plan de prueba' : 'Error al crear el plan de prueba');
    }
  };

  const handleDeleteTestPlan = async (testPlanId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/testplans/test-plans/${testPlanId}`);
      fetchTestPlans();
    } catch (err) {
      setError('Error al eliminar el plan de prueba');
    }
  };

  return (
    <div className="projects-container">
      <h1>Gestión de Planes de Prueba</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className="new-project-button" onClick={handleNewTestPlan}>
        <i className="fas fa-plus-circle"></i> Nuevo Plan de Prueba
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Nombre del Plan</th>
            <th>Descripción</th>
            <th>Proyecto ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {testPlans.map((plan) => (
            <tr key={plan.test_plan_id}>
              <td>{plan.plan_name}</td>
              <td>{plan.description}</td>
              <td>{plan.project_id}</td>
              <td>
                <button className="action-button edit-button" onClick={() => handleEditTestPlan(plan)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="action-button delete-button" onClick={() => handleDeleteTestPlan(plan.test_plan_id)}>
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Crear/Editar Plan de Prueba */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? 'Editar Plan de Prueba' : 'Nuevo Plan de Prueba'}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Proyecto ID:</label>
              <input
                type="text"
                name="project_id"
                value={newTestPlan.project_id}
                onChange={handleInputChange}
                required
              />
              <label>Nombre del Plan:</label>
              <input
                type="text"
                name="plan_name"
                value={newTestPlan.plan_name}
                onChange={handleInputChange}
                required
              />
              <label>Descripción:</label>
              <textarea
                name="description"
                value={newTestPlan.description}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Plan'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPlans;
