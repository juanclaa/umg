// models/taskModel.js
const db = require('../db');

const createTask = (taskData, callback) => {
    const { project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status } = taskData;
    const sql = `INSERT INTO project_management.tasks (project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status], (err, result) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err); // Muestra el error completo en la consola
            callback(err, null); // Pasa el error al callback para manejarlo en el controlador
        } else {
            callback(null, result); // Pasa el resultado si no hay error
        }
    });
};

const getAllTasks = (callback) => {
    const sql = `SELECT * FROM tasks`;
    db.query(sql, callback);
};


const getCountTasks = (callback) => {
    const sql = `SELECT count(*) as  conteo FROM project_management.tasks`;
    db.query(sql, callback);
};

const getTaskById = (taskId, callback) => {
    const sql = `SELECT * FROM tasks WHERE task_id = ?`;
    db.query(sql, [taskId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

const updateTask = (taskId, updatedData, callback) => {
    const { project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status } = updatedData;
    const sql = `UPDATE tasks SET project_id = ?, milestone_id = ?, task_name = ?, description = ?, assigned_to = ?, start_date = ?, due_date = ?, status = ? WHERE task_id = ?`;
    db.query(sql, [project_id, milestone_id, task_name, description, assigned_to, start_date, due_date, status, taskId], callback);
};



const deleteTask = (taskId, callback) => {
    const sql = `DELETE FROM tasks WHERE task_id = ?`;

    db.query(sql, [taskId], (err, result) => {
        if (err) {
            console.error("Error al eliminar la tarea:", err); // Muestra el error completo en la consola
            callback(err, null); // Pasa el error al callback para manejarlo en el controlador
        } else {
            callback(null, result); // Pasa el resultado si no hay error
        }
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
