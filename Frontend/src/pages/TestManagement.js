import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const TestCases = () => {
  const [testCases, setTestCases] = useState([]);
  const [newTestCase, setNewTestCase] = useState({
    test_plan_id: '',
    case_name: '',
    description: '',
    expected_result: ''
  });
  const [newTestExecution, setNewTestExecution] = useState({
    test_case_id: '',
    executed_by: '',
    execution_date: '',
    result: 'Satisfactorio',
    notes: ''
  });
  const [newDefect, setNewDefect] = useState({
    test_case_id: '',
    reported_by: '',
    assigned_to: '',
    status: '',
    severity: '',
    priority: '',
    description: ''
  });
  const [resources, setResources] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [selectedTestCaseForExecution, setSelectedTestCaseForExecution] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [showDefectModal, setShowDefectModal] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };


  // Fetch Test Cases
  const fetchTestCases = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/testplans/test-cases');
      setTestCases(response.data);
    } catch (err) {
      setError('Error al obtener los casos de prueba');
    }
  };

  useEffect(() => {
    fetchTestCases();
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://46.183.114.118:4000/api/resources', config);
      setResources(response.data);
    } catch (err) {
      setError('Error al obtener los recursos');
    }
  };

  const handleInputChange = (e) => {
    setNewTestCase({
      ...newTestCase,
      [e.target.name]: e.target.value
    });
  };

  const handleExecutionInputChange = (e) => {
    setNewTestExecution({
      ...newTestExecution,
      [e.target.name]: e.target.value
    });
  };

  const handleDefectInputChange = (e) => {
    setNewDefect({
      ...newDefect,
      [e.target.name]: e.target.value
    });
  };

  const handleNewTestCase = () => {
    setNewTestCase({
      test_plan_id: '',
      case_name: '',
      description: '',
      expected_result: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditTestCase = (testCase) => {
    setNewTestCase({
      test_plan_id: testCase.test_plan_id,
      case_name: testCase.case_name,
      description: testCase.description,
      expected_result: testCase.expected_result
    });
    setSelectedTestCase(testCase);
    setEditMode(true);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://46.183.114.118:4000/api/testplans/test-cases/${selectedTestCase.test_case_id}`, newTestCase);
      } else {
        await axios.post('http://46.183.114.118:4000/api/testplans/test-cases', newTestCase);
      }
      fetchTestCases();
      setShowModal(false);
    } catch (err) {
      setError(editMode ? 'Error al editar el caso de prueba' : 'Error al crear el caso de prueba');
    }
  };

  const handleDeleteTestCase = async (testCaseId) => {
    try {
      await axios.delete(`http://46.183.114.118:4000/api/testplans/test-cases/${testCaseId}`);
      fetchTestCases();
    } catch (err) {
      setError('Error al eliminar el caso de prueba');
    }
  };

  // Open modal for adding a new test execution
  const handleNewExecution = (testCase) => {
    setNewTestExecution({
      test_case_id: testCase.test_case_id,
      executed_by: '',
      execution_date: '',
      result: 'Satisfactorio',
      notes: ''
    });
    setSelectedTestCaseForExecution(testCase);
    setShowExecutionModal(true);
  };

  // Submit the new test execution form
  const handleExecutionFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://46.183.114.118:4000/api/testplans/test-executions', newTestExecution);
      setShowExecutionModal(false);
      fetchTestCases();

      // Open defect modal if result is "Fallido"
      if (newTestExecution.result === "Fallido") {
        setNewDefect({
          test_case_id: newTestExecution.test_case_id,
          reported_by: '',
          assigned_to: '',
          status: 'Abierto',
          severity: '',
          priority: '',
          description: ''
        });
        setShowDefectModal(true);
      }
    } catch (err) {
      setError('Error al crear la ejecución de prueba');
    }
  };

  // Submit the new defect form
  const handleDefectFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://46.183.114.118:4000/api/defectRoutes/', newDefect);
      setShowDefectModal(false);
    } catch (err) {
      setError('Error al crear el defecto');
    }
  };

  return (
    <div className="projects-container">
      <h1>Gestión de Casos de Prueba</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button className="new-project-button" onClick={handleNewTestCase}>
        <i className="fas fa-plus-circle"></i> Nuevo Caso de Prueba
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>ID de Plan de Prueba</th>
            <th>Nombre del Caso</th>
            <th>Descripción</th>
            <th>Resultado Esperado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase) => (
            <tr key={testCase.test_case_id}>
              <td>{testCase.test_plan_id}</td>
              <td>{testCase.case_name}</td>
              <td>{testCase.description}</td>
              <td>{testCase.expected_result}</td>
              <td>
                <button className="action-button edit-button" onClick={() => handleEditTestCase(testCase)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="action-button delete-button" onClick={() => handleDeleteTestCase(testCase.test_case_id)}>
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
                <button className="action-button new-execution-button" onClick={() => handleNewExecution(testCase)}>
                  <i className="fas fa-play-circle"></i> Nueva Ejecución
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Crear/Editar Caso de Prueba */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? 'Editar Caso de Prueba' : 'Nuevo Caso de Prueba'}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>ID de Plan de Prueba:</label>
              <input
                type="text"
                name="test_plan_id"
                value={newTestCase.test_plan_id}
                onChange={handleInputChange}
                required
              />
              <label>Nombre del Caso:</label>
              <input
                type="text"
                name="case_name"
                value={newTestCase.case_name}
                onChange={handleInputChange}
                required
              />
              <label>Descripción:</label>
              <textarea
                name="description"
                value={newTestCase.description}
                onChange={handleInputChange}
                required
              />
              <label>Resultado Esperado:</label>
              <textarea
                name="expected_result"
                value={newTestCase.expected_result}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{editMode ? 'Guardar Cambios' : 'Crear Caso'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Crear Ejecución de Prueba */}
{showExecutionModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Nueva Ejecución de Prueba para el Caso: {selectedTestCaseForExecution?.case_name}</h2>
      <form onSubmit={handleExecutionFormSubmit}>
        <label>Recurso (Ejecutado por):</label>
        <select
          name="executed_by"
          value={newTestExecution.executed_by}
          onChange={(e) => setNewTestExecution({
            ...newTestExecution,
            executed_by: e.target.value  // Guardar el resource_id en executed_by
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

        <label>Fecha de Ejecución:</label>
        <input
          type="date"
          name="execution_date"
          value={newTestExecution.execution_date}
          onChange={handleExecutionInputChange}
          required
        />

        <label>Resultado:</label>
        <select
          name="result"
          value={newTestExecution.result}
          onChange={handleExecutionInputChange}
          required
        >
          <option value="Satisfactorio">Satisfactorio</option>
          <option value="Fallido">Fallido</option>
        </select>

        <label>Notas:</label>
        <textarea
          name="notes"
          value={newTestExecution.notes}
          onChange={handleExecutionInputChange}
        />
        <div className="modal-buttons">
          <button type="submit">Crear Ejecución</button>
          <button type="button" onClick={() => setShowExecutionModal(false)}>Cancelar</button>
        </div>
      </form>
    </div>
  </div>
)}


{/* Modal para Crear Defecto */}
{showDefectModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Crear Defecto para el Caso: {selectedTestCaseForExecution?.case_name}</h2>
      <form onSubmit={handleDefectFormSubmit}>

        <label>Reportado por:</label>
        <select
          name="reported_by"
          value={newDefect.reported_by}
          onChange={handleDefectInputChange}
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
          onChange={handleDefectInputChange}
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
          onChange={handleDefectInputChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Abierto">Abierto</option>
          <option value="Cerrado">Cerrado</option>
        </select>

        <label>Severidad:</label>
        <select
          name="severity"
          value={newDefect.severity}
          onChange={handleDefectInputChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <label>Prioridad:</label>
        <select
          name="priority"
          value={newDefect.priority}
          onChange={handleDefectInputChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <label>Descripción:</label>
        <textarea
          name="description"
          value={newDefect.description}
          onChange={handleDefectInputChange}
          required
        />
        <div className="modal-buttons">
          <button type="submit">Crear Defecto</button>
          <button type="button" onClick={() => setShowDefectModal(false)}>Cancelar</button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default TestCases;
