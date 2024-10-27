const taskModel = require('../models/taskModel');

// Controlador para crear una nueva tarea
const createTask = (req, res) => {
    console.log(req.body);
    const { project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status } = req.body;

    // Validaciones básicas
    if (!task_name|| !start_date) {
        return res.status(400).json({ error: 'El nombre de la tarea, el proyecto asociado y la fecha de inicio son obligatorios' });
        
    }

    const newTask = { project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status };

    taskModel.createTask(newTask, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear la tarea' });
        }
        res.status(201).json({ message: 'Tarea creada exitosamente', taskId: result.insertId });
    });
};

// Controlador para obtener todas las tareas
const getAllTasks = (req, res) => {
    taskModel.getAllTasks((err, tasks) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las tareas' });
        }
        res.status(200).json(tasks);
    });
};

// Controlador para obtener todas las tareas
const getCountTasks = (req, res) => {
    taskModel.getAllTasks((err, tasks) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las tareas' });
        }
        res.status(200).json(tasks);
    });
};
// Controlador para obtener una tarea por su ID
const getTaskById = (req, res) => {
    const taskId = req.params.id;

    taskModel.getTaskById(taskId, (err, task) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la tarea' });
        }
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    });
};

// Controlador para actualizar una tarea
const updateTask = (req, res) => {
    const taskId = req.params.id;
    const updatedData = req.body;

    taskModel.updateTask(taskId, updatedData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la tarea' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea actualizada exitosamente' });
    });
};

// Controlador para eliminar una tarea
const deleteTask = (req, res) => {
    const taskId = req.params.id;

    taskModel.deleteTask(taskId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la tarea' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getCountTasks
};
