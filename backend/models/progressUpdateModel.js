// models/progressUpdateModel.js
const db = require('../db');

const createProgressUpdate = (progressUpdateData, callback) => {
    const { task_id, project_id, progress_percentage, notes } = progressUpdateData;
    const sql = `INSERT INTO progress_updates (task_id, project_id, progress_percentage, notes) VALUES (?, ?, ?, ?)`;
    db.query(sql, [task_id, project_id, progress_percentage, notes], callback);
};

const getAllProgressUpdates = (callback) => {
    const sql = `SELECT * FROM progress_updates`;
    db.query(sql, callback);
};

const getProgressUpdateById = (updateId, callback) => {
    const sql = `SELECT * FROM progress_updates WHERE update_id = ?`;
    db.query(sql, [updateId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

const updateProgressUpdate = (updateId, updatedData, callback) => {
    const { progress_percentage, notes } = updatedData;
    const sql = `UPDATE progress_updates SET progress_percentage = ?, notes = ? WHERE update_id = ?`;
    db.query(sql, [progress_percentage, notes, updateId], callback);
};

const deleteProgressUpdate = (updateId, callback) => {
    const sql = `DELETE FROM progress_updates WHERE update_id = ?`;
    db.query(sql, [updateId], callback);
};

module.exports = {
    createProgressUpdate,
    getAllProgressUpdates,
    getProgressUpdateById,
    updateProgressUpdate,
    deleteProgressUpdate,
};
