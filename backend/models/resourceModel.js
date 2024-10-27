const db = require('../db');

// Modelo para crear un nuevo recurso
const createResource = (resourceData, callback) => {
    const { resource_name, role, email, phone } = resourceData;
    const sql = `INSERT INTO project_management.resources (resource_name, role, email, phone) VALUES (?, ?, ?, ?)`;
    db.query(sql, [resource_name, role, email, phone],  (err, result) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err); // Muestra el error completo en la consola
            callback(err, null); // Pasa el error al callback para manejarlo en el controlador
        } else {
            callback(null, result); // Pasa el resultado si no hay error
        }
    });
};

// Modelo para obtener todos los recursos
const getAllResources = (callback) => {
    const sql = `SELECT * FROM resources`;
    db.query(sql, callback);
};

// Modelo para obtener un recurso por su ID
const getResourceById = (resourceId, callback) => {
    const sql = `SELECT * FROM resources WHERE resource_id = ?`;
    db.query(sql, [resourceId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]); // Devolver solo el primer resultado (ya que es un único recurso)
    });
};

// Modelo para actualizar un recurso
const updateResource = (resourceId, updatedData, callback) => {
    const { resource_name, role, email, phone } = updatedData;
    const sql = `UPDATE resources SET resource_name = ?, role = ?, email = ?, phone = ? WHERE resource_id = ?`;
    db.query(sql, [resource_name, role, email, phone, resourceId], callback);
};

// Modelo para eliminar un recurso
const deleteResource = (resourceId, callback) => {
    const sql = `DELETE FROM resources WHERE resource_id = ?`;
    db.query(sql, [resourceId], callback);
};

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
};
