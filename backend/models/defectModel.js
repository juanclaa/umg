// models/defectModel.js
const db = require('../db');  // Asegúrate de que este archivo conecta correctamente a la base de datos

// Crear un nuevo defecto
const createDefect = (defectData, callback) => {
    const { test_case_id, reported_by, assigned_to, status, severity, priority, description } = defectData;
    const sql = `INSERT INTO defects (test_case_id, reported_by, assigned_to, status, severity, priority, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [test_case_id, reported_by, assigned_to, status, severity, priority, description], callback);
};

// Obtener todos los defectos
const getAllDefects = (callback) => {
    const sql = `SELECT * FROM defects`;
    db.query(sql, callback);
};

// Obtener un defecto por ID
const getDefectById = (defectId, callback) => {
    const sql = `SELECT * FROM defects WHERE defect_id = ?`;
    db.query(sql, [defectId], callback);
};

// Actualizar un defecto por ID
const updateDefect = (defectId, defectData, callback) => {
    const { test_case_id, reported_by, assigned_to, status, severity, priority, description } = defectData;
    const sql = `UPDATE defects SET test_case_id = ?, reported_by = ?, assigned_to = ?, status = ?, severity = ?, priority = ?, description = ? WHERE defect_id = ?`;
    db.query(sql, [test_case_id, reported_by, assigned_to, status, severity, priority, description, defectId], callback);
};

// Eliminar un defecto por ID
const deleteDefect = (defectId, callback) => {
    const sql = `DELETE FROM defects WHERE defect_id = ?`;
    db.query(sql, [defectId], callback);
};

module.exports = {
    createDefect,
    getAllDefects,
    getDefectById,
    updateDefect,
    deleteDefect
};
