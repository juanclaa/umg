const milestoneModel = require('../models/milestoneModel');

// Controlador para crear un nuevo hito
const createMilestone = (req, res) => {
    const { project_id, milestone_name, description, due_date, status } = req.body;

    // Validaciones básicas
    if (!project_id || !milestone_name) {
        return res.status(400).json({ error: 'El proyecto y el nombre del hito son obligatorios' });
    }

    const newMilestone = { project_id, milestone_name, description, due_date, status };

    milestoneModel.createMilestone(newMilestone, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el hito' });
        }
        res.status(201).json({ message: 'Hito creado exitosamente', milestoneId: result.insertId });
    });
};

// Controlador para obtener todos los hitos
const getAllMilestones = (req, res) => {
    milestoneModel.getAllMilestones((err, milestones) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los hitos' });
        }
        res.status(200).json(milestones);
    });
};

// Controlador para obtener un hito por su ID
const getMilestoneById = (req, res) => {
    const milestoneId = req.params.id;

    milestoneModel.getMilestoneById(milestoneId, (err, milestone) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el hito' });
        }
        if (!milestone) {
            return res.status(404).json({ error: 'Hito no encontrado' });
        }
        res.status(200).json(milestone);
    });
};

// Controlador para actualizar un hito
const updateMilestone = (req, res) => {
    const milestoneId = req.params.id;
    const updatedData = req.body;

    milestoneModel.updateMilestone(milestoneId, updatedData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el hito' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hito no encontrado' });
        }
        res.status(200).json({ message: 'Hito actualizado exitosamente' });
    });
};

// Controlador para eliminar un hito
const deleteMilestone = (req, res) => {
    const milestoneId = req.params.id;

    milestoneModel.deleteMilestone(milestoneId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el hito' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hito no encontrado' });
        }
        res.status(200).json({ message: 'Hito eliminado exitosamente' });
    });
};

module.exports = {
    createMilestone,
    getAllMilestones,
    getMilestoneById,
    updateMilestone,
    deleteMilestone
};
