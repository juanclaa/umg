// models/projectResourceModel.js
const db = require('../db');

const createProjectResource = (projectResourceData, callback) => {
    const { project_id, resource_id, assigned_date, role_in_project } = projectResourceData;
    const sql = `INSERT INTO project_management.project_resources (project_id, resource_id, assigned_date, role_in_project) VALUES (?, ?, ?, ?)`;
    db.query(sql, [project_id, resource_id, assigned_date, role_in_project], callback);
};

const getAllProjectResources = (callback) => {
    const sql = `SELECT 
    a.project_resource_id,  -- Incluye la clave primaria para la edición/eliminación
    b.project_id,
    b.project_name,
    c.resource_id,
    c.resource_name,
    a.assigned_date,
    a.role_in_project
FROM 
    project_management.project_resources a
INNER JOIN 
    project_management.projects b ON a.project_id = b.project_id
INNER JOIN 
    project_management.resources c ON a.resource_id = c.resource_id`;
    db.query(sql, callback);
};

const getProjectResourceById = (projectResourceId, callback) => {
    const sql = `SELECT * FROM project_resources WHERE project_resource_id = ?`;
    db.query(sql, [projectResourceId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

const updateProjectResource = (projectResourceId, updatedData, callback) => {
    const { project_id, resource_id, assigned_date, role_in_project } = updatedData;
    const sql = `UPDATE project_resources SET project_id = ?, resource_id = ?, assigned_date = ?, role_in_project = ? WHERE project_resource_id = ?`;
    db.query(sql, [project_id, resource_id, assigned_date, role_in_project, projectResourceId], callback);
};

const deleteProjectResource = (projectResourceId, callback) => {
    const sql = `DELETE FROM project_resources WHERE project_resource_id = ?`;
    db.query(sql, [projectResourceId], callback);
};

module.exports = {
    createProjectResource,
    getAllProjectResources,
    getProjectResourceById,
    updateProjectResource,
    deleteProjectResource,
};
