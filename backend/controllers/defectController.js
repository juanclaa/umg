// controllers/defectController.js
const db = require('../db'); // Asegúrate de que este archivo está conectado a la base de datos

// Obtener todos los defectos
const getAllDefects = (req, res) => {
    const sql = `SELECT * FROM defects`;
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los defectos' });
        }
        res.json(results);
    });
};

// Obtener un defecto por ID
const getDefectById = (req, res) => {
    const sql = `SELECT * FROM defects WHERE defect_id = ?`;
    db.query(sql, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el defecto' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo defecto
const createDefect = (req, res) => {
    const { test_case_id, reported_by, assigned_to, status, severity, priority, description } = req.body;
    const sql = `INSERT INTO defects (test_case_id, reported_by, assigned_to, status, severity, priority, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [test_case_id, reported_by, assigned_to, status, severity, priority, description], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear el defecto' });
        }
        res.json({ message: 'Defecto creado exitosamente', defect_id: results.insertId });
    });
};

// Actualizar un defecto por ID
const updateDefect = (req, res) => {
    const { test_case_id, reported_by, assigned_to, status, severity, priority, description } = req.body;
    const sql = `UPDATE defects SET test_case_id = ?, reported_by = ?, assigned_to = ?, status = ?, severity = ?, priority = ?, description = ? WHERE defect_id = ?`;
    db.query(sql, [test_case_id, reported_by, assigned_to, status, severity, priority, description, req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar el defecto' });
        }
        res.json({ message: 'Defecto actualizado exitosamente' });
    });
};

// Eliminar un defecto por ID
const deleteDefect = (req, res) => {
    const sql = `DELETE FROM defects WHERE defect_id = ?`;
    db.query(sql, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el defecto' });
        }
        res.json({ message: 'Defecto eliminado exitosamente' });
    });
};

module.exports = {
    getAllDefects,
    getDefectById,
    createDefect,
    updateDefect,
    deleteDefect
};
