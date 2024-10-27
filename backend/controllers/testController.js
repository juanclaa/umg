// controllers/testController.js
const testModel = require('../models/testModel');

// Controlador para `test_plans`
const createTestPlan = (req, res) => {
    console.log(req.body);
    const { project_id, plan_name, description } = req.body;
    testModel.createTestPlan({ project_id, plan_name, description }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear el plan de prueba 1' });
        res.status(201).json({ message: 'Plan de prueba creado exitosamente', result });
    });
};

const getAllTestPlans = (req, res) => {
    testModel.getAllTestPlans((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los planes de prueba' });
        res.json(results);
    });
};

const getTestPlanById = (req, res) => {
    testModel.getTestPlanById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el plan de prueba' });
        res.json(result);
    });
};

const updateTestPlan = (req, res) => {
    const { project_id, plan_name, description } = req.body;
    testModel.updateTestPlan(req.params.id, { project_id, plan_name, description }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el plan de prueba' });
        res.json({ message: 'Plan de prueba actualizado exitosamente', result });
    });
};

const deleteTestPlan = (req, res) => {
    testModel.deleteTestPlan(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el plan de prueba' });
        res.json({ message: 'Plan de prueba eliminado exitosamente', result });
    });
};

// Controlador para `test_cases`
const createTestCase = (req, res) => {
    const { test_plan_id, case_name, description, expected_result } = req.body;
    testModel.createTestCase({ test_plan_id, case_name, description, expected_result }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear el caso de prueba' });
        res.status(201).json({ message: 'Caso de prueba creado exitosamente', result });
    });
};

const getAllTestCases = (req, res) => {
    testModel.getAllTestCases((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los casos de prueba' });
        res.json(results);
    });
};

const getTestCaseById = (req, res) => {
    testModel.getTestCaseById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el caso de prueba' });
        res.json(result);
    });
};

const updateTestCase = (req, res) => {
    const { test_plan_id, case_name, description, expected_result } = req.body;
    testModel.updateTestCase(req.params.id, { test_plan_id, case_name, description, expected_result }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el caso de prueba' });
        res.json({ message: 'Caso de prueba actualizado exitosamente', result });
    });
};

const deleteTestCase = (req, res) => {
    testModel.deleteTestCase(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el caso de prueba' });
        res.json({ message: 'Caso de prueba eliminado exitosamente', result });
    });
};

// Controlador para `test_executions`
const createTestExecution = (req, res) => {
    const { test_case_id, executed_by, result, notes } = req.body;
    testModel.createTestExecution({ test_case_id, executed_by, result, notes }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear la ejecución de prueba' });
        res.status(201).json({ message: 'Ejecución de prueba creada exitosamente', result });
    });
};

const getAllTestExecutions = (req, res) => {
    testModel.getAllTestExecutions((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener las ejecuciones de prueba' });
        res.json(results);
    });
};

const getTestExecutionById = (req, res) => {
    testModel.getTestExecutionById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al obtener la ejecución de prueba' });
        res.json(result);
    });
};

const updateTestExecution = (req, res) => {
    const { test_case_id, executed_by, result, notes } = req.body;
    testModel.updateTestExecution(req.params.id, { test_case_id, executed_by, result, notes }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar la ejecución de prueba' });
        res.json({ message: 'Ejecución de prueba actualizada exitosamente', result });
    });
};

const deleteTestExecution = (req, res) => {
    testModel.deleteTestExecution(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar la ejecución de prueba' });
        res.json({ message: 'Ejecución de prueba eliminada exitosamente', result });
    });
};

// Exportar todos los métodos del controlador
module.exports = {
    // Métodos de test_plans
    createTestPlan,
    getAllTestPlans,
    getTestPlanById,
    updateTestPlan,
    deleteTestPlan,
    
    // Métodos de test_cases
    createTestCase,
    getAllTestCases,
    getTestCaseById,
    updateTestCase,
    deleteTestCase,

    // Métodos de test_executions
    createTestExecution,
    getAllTestExecutions,
    getTestExecutionById,
    updateTestExecution,
    deleteTestExecution
};
