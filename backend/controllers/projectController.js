const projectModel = require('../models/projectModel');

// Controlador para crear un nuevo proyecto
const createProject = (req, res) => {
    const { project_name, description, start_date, end_date, status } = req.body;

    // Validaciones básicas
    if (!project_name || !start_date) {
        return res.status(400).json({ error: 'El nombre del proyecto y la fecha de inicio son obligatorios' });
    }

    const newProject = { project_name, description, start_date, end_date, status };

    projectModel.createProject(newProject, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el proyecto' });
        }
        res.status(201).json({ message: 'Proyecto creado exitosamente', projectId: result.insertId });
    });
};

// Controlador para obtener todos los proyectos
const getAllProjects = (req, res) => {
    projectModel.getAllProjects((err, projects) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
        res.status(200).json(projects);
    });
};


// Controlador para obtener todos los proyectos por stado
const getProjectsbystatus = (req, res) => {
    projectModel.getProjectsbystatus((err, projects) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
        res.status(200).json(projects);
    });
};


// Controlador para obtener un proyecto por su ID
const getProjectById = (req, res) => {
    const projectId = req.params.id;

    projectModel.getProjectById(projectId, (err, project) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(200).json(project);
    });
};

// Controlador para actualizar un proyecto
const updateProject = (req, res) => {
    const projectId = req.params.id;
    const updatedData = req.body;

    projectModel.updateProject(projectId, updatedData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el proyecto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(200).json({ message: 'Proyecto actualizado exitosamente' });
    });
};

// Controlador para eliminar un proyecto
const deleteProject = (req, res) => {
    const projectId = req.params.id;

    projectModel.deleteProject(projectId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el proyecto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
    });
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectsbystatus
};
