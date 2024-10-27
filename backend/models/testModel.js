// models/testModel.js
const db = require('../db');  // Archivo de conexión a la base de datos

// Funciones para la tabla test_plans

const createTestPlan = (testPlanData, callback) => {
    const { project_id, plan_name, description } = testPlanData;
    const sql = `INSERT INTO test_plans (project_id, plan_name, description) VALUES (?, ?, ?)`;
    db.query(sql, [project_id, plan_name, description], (err, result) => {
        if (err) {
            console.error("Error al insertar plan:", err); // Muestra el error completo en la consola
            callback(err, null); // Pasa el error al callback para manejarlo en el controlador
        } else {
            callback(null, result); // Pasa el resultado si no hay error
        }
    });
};

const getAllTestPlans = (callback) => {
    const sql = `SELECT * FROM test_plans`;
    db.query(sql, callback);
};

const getTestPlanById = (id, callback) => {
    const sql = `SELECT * FROM test_plans WHERE test_plan_id = ?`;
    db.query(sql, [id], callback);
};

const updateTestPlan = (id, testPlanData, callback) => {
    const { project_id, plan_name, description } = testPlanData;
    const sql = `UPDATE test_plans SET project_id = ?, plan_name = ?, description = ? WHERE test_plan_id = ?`;
    db.query(sql, [project_id, plan_name, description, id], callback);
};

const deleteTestPlan = (id, callback) => {
    const sql = `DELETE FROM test_plans WHERE test_plan_id = ?`;
    db.query(sql, [id], callback);
};

// Funciones para la tabla test_cases

const createTestCase = (testCaseData, callback) => {
    const { test_plan_id, case_name, description, expected_result } = testCaseData;
    const sql = `INSERT INTO test_cases (test_plan_id, case_name, description, expected_result) VALUES (?, ?, ?, ?)`;
    db.query(sql, [test_plan_id, case_name, description, expected_result], callback);
};

const getAllTestCases = (callback) => {
    const sql = `SELECT * FROM test_cases`;
    db.query(sql, callback);
};

const getTestCaseById = (id, callback) => {
    const sql = `SELECT * FROM test_cases WHERE test_case_id = ?`;
    db.query(sql, [id], callback);
};

const updateTestCase = (id, testCaseData, callback) => {
    const { test_plan_id, case_name, description, expected_result } = testCaseData;
    const sql = `UPDATE test_cases SET test_plan_id = ?, case_name = ?, description = ?, expected_result = ? WHERE test_case_id = ?`;
    db.query(sql, [test_plan_id, case_name, description, expected_result, id], callback);
};

const deleteTestCase = (id, callback) => {
    const sql = `DELETE FROM test_cases WHERE test_case_id = ?`;
    db.query(sql, [id], callback);
};

// Funciones para la tabla test_executions

const createTestExecution = (testExecutionData, callback) => {
    const { test_case_id, executed_by, result, notes } = testExecutionData;
    const sql = `INSERT INTO test_executions (test_case_id, executed_by, result, notes) VALUES (?, ?, ?, ?)`;
    db.query(sql, [test_case_id, executed_by, result, notes], callback);
};

const getAllTestExecutions = (callback) => {
    const sql = `SELECT * FROM test_executions`;
    db.query(sql, callback);
};

const getTestExecutionById = (id, callback) => {
    const sql = `SELECT * FROM test_executions WHERE test_execution_id = ?`;
    db.query(sql, [id], callback);
};

const updateTestExecution = (id, testExecutionData, callback) => {
    const { test_case_id, executed_by, result, notes } = testExecutionData;
    const sql = `UPDATE test_executions SET test_case_id = ?, executed_by = ?, result = ?, notes = ? WHERE test_execution_id = ?`;
    db.query(sql, [test_case_id, executed_by, result, notes, id], callback);
};

const deleteTestExecution = (id, callback) => {
    const sql = `DELETE FROM test_executions WHERE test_execution_id = ?`;
    db.query(sql, [id], callback);
};

// Exportar todas las funciones
module.exports = {
    // Funciones de test_plans
    createTestPlan,
    getAllTestPlans,
    getTestPlanById,
    updateTestPlan,
    deleteTestPlan,
    
    // Funciones de test_cases
    createTestCase,
    getAllTestCases,
    getTestCaseById,
    updateTestCase,
    deleteTestCase,

    // Funciones de test_executions
    createTestExecution,
    getAllTestExecutions,
    getTestExecutionById,
    updateTestExecution,
    deleteTestExecution
};
