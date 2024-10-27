const db = require('../db');

// Modelo para crear un nuevo proyecto
const createProject = (projectData, callback) => {
    const { project_name, description, start_date, end_date, status } = projectData;
    const sql = `INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [project_name, description, start_date, end_date, status], callback);
};

// Modelo para obtener todos los proyectos
const getAllProjects = (callback) => {
    const sql = `SELECT * FROM projects`;
    db.query(sql, callback);
};

// Modelo para obtener un proyecto por su ID
const getProjectById = (projectId, callback) => {
    const sql = `SELECT * FROM projects WHERE project_id = ?`;
    db.query(sql, [projectId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]); // Devolver solo el primer resultado (ya que es un único proyecto)
    });
};

// Modelo para actualizar un proyecto
const updateProject = (projectId, updatedData, callback) => {
    const { project_name, description, start_date, end_date, status } = updatedData;
    const sql = `UPDATE projects SET project_name = ?, description = ?, start_date = ?, end_date = ?, status = ? WHERE project_id = ?`;
    db.query(sql, [project_name, description, start_date, end_date, status, projectId], callback);
};

// Modelo para eliminar un proyecto
const deleteProject = (projectId, callback) => {
    const sql = `DELETE FROM projects WHERE project_id = ?`;
    db.query(sql, [projectId], callback);
};

const getProjectsbystatus = ( callback) => {
    const sql = `SELECT status, count(*) FROM projects group by status`;
    db.query(sql, callback);
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectsbystatus
};
