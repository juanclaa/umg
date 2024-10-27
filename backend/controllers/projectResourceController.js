const projectResourceModel = require('../models/projectResourceModel');

// Controlador para crear una nueva relación entre proyecto y recurso
const createProjectResource = (req, res) => {
    const { project_id, resource_id, assigned_date, role_in_project } = req.body;

    // Validaciones básicas
    if (!project_id || !resource_id) {
        return res.status(400).json({ error: 'El proyecto y el recurso son obligatorios' });
    }

    const newProjectResource = { project_id, resource_id, assigned_date, role_in_project };

    projectResourceModel.createProjectResource(newProjectResource, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al asignar recurso al proyecto' });
        }
        res.status(201).json({ message: 'Recurso asignado al proyecto exitosamente', projectResourceId: result.insertId });
    });
};

// Controlador para obtener todas las relaciones de proyecto y recurso
const getAllProjectResources = (req, res) => {
    projectResourceModel.getAllProjectResources((err, projectResources) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener asignaciones de recursos a proyectos' });
        }
        res.status(200).json(projectResources);
    });
};

// Controlador para obtener una relación específica entre proyecto y recurso por su ID
const getProjectResourceById = (req, res) => {
    const projectResourceId = req.params.id;

    projectResourceModel.getProjectResourceById(projectResourceId, (err, projectResource) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la asignación de recurso a proyecto' });
        }
        if (!projectResource) {
            return res.status(404).json({ error: 'Asignación de recurso a proyecto no encontrada' });
        }
        res.status(200).json(projectResource);
    });
};

// Controlador para actualizar una relación de proyecto y recurso
const updateProjectResource = (req, res) => {
    const projectResourceId = req.params.id;
    const updatedData = req.body;

    projectResourceModel.updateProjectResource(projectResourceId, updatedData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la asignación de recurso a proyecto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación de recurso a proyecto no encontrada' });
        }
        res.status(200).json({ message: 'Asignación de recurso a proyecto actualizada exitosamente' });
    });
};

// Controlador para eliminar una relación de proyecto y recurso
const deleteProjectResource = (req, res) => {
    const projectResourceId = req.params.id;

    projectResourceModel.deleteProjectResource(projectResourceId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la asignación de recurso a proyecto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación de recurso a proyecto no encontrada' });
        }
        res.status(200).json({ message: 'Asignación de recurso a proyecto eliminada exitosamente' });
    });
};

module.exports = {
    createProjectResource,
    getAllProjectResources,
    getProjectResourceById,
    updateProjectResource,
    deleteProjectResource
};
