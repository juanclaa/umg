const progressUpdateModel = require('../models/progressUpdateModel');

// Controlador para crear una nueva actualización de progreso
const createProgressUpdate = (req, res) => {
    const { task_id, project_id, progress_percentage, notes } = req.body;

    // Validaciones básicas
    if (!task_id || !project_id || progress_percentage === undefined) {
        return res.status(400).json({ error: 'La tarea, el proyecto y el porcentaje de progreso son obligatorios' });
    }

    const newProgressUpdate = { task_id, project_id, progress_percentage, notes };

    progressUpdateModel.createProgressUpdate(newProgressUpdate, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear la actualización de progreso' });
        }
        res.status(201).json({ message: 'Actualización de progreso creada exitosamente', updateId: result.insertId });
    });
};

// Controlador para obtener todas las actualizaciones de progreso
const getAllProgressUpdates = (req, res) => {
    progressUpdateModel.getAllProgressUpdates((err, progressUpdates) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las actualizaciones de progreso' });
        }
        res.status(200).json(progressUpdates);
    });
};

// Controlador para obtener una actualización de progreso por su ID
const getProgressUpdateById = (req, res) => {
    const updateId = req.params.id;

    progressUpdateModel.getProgressUpdateById(updateId, (err, progressUpdate) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la actualización de progreso' });
        }
        if (!progressUpdate) {
            return res.status(404).json({ error: 'Actualización de progreso no encontrada' });
        }
        res.status(200).json(progressUpdate);
    });
};

// Controlador para actualizar una actualización de progreso
const updateProgressUpdate = (req, res) => {
    const updateId = req.params.id;
    const updatedData = req.body;

    progressUpdateModel.updateProgressUpdate(updateId, updatedData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la actualización de progreso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Actualización de progreso no encontrada' });
        }
        res.status(200).json({ message: 'Actualización de progreso actualizada exitosamente' });
    });
};

// Controlador para eliminar una actualización de progreso
const deleteProgressUpdate = (req, res) => {
    const updateId = req.params.id;

    progressUpdateModel.deleteProgressUpdate(updateId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la actualización de progreso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Actualización de progreso no encontrada' });
        }
        res.status(200).json({ message: 'Actualización de progreso eliminada exitosamente' });
    });
};

module.exports = {
    createProgressUpdate,
    getAllProgressUpdates,
    getProgressUpdateById,
    updateProgressUpdate,
    deleteProgressUpdate
};
