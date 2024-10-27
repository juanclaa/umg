// models/milestoneModel.js
const db = require('../db');

const createMilestone = (milestoneData, callback) => {
    const { project_id, milestone_name, description, due_date, status } = milestoneData;
    const sql = `INSERT INTO milestones (project_id, milestone_name, description, due_date, status) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [project_id, milestone_name, description, due_date, status], callback);
};

const getAllMilestones = (callback) => {
    const sql = `SELECT * FROM milestones`;
    db.query(sql, callback);
};

const getMilestoneById = (milestoneId, callback) => {
    const sql = `SELECT * FROM milestones WHERE milestone_id = ?`;
    db.query(sql, [milestoneId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

const updateMilestone = (milestoneId, updatedData, callback) => {
    const { project_id, milestone_name, description, due_date, status } = updatedData;
    const sql = `UPDATE milestones SET project_id = ?, milestone_name = ?, description = ?, due_date = ?, status = ? WHERE milestone_id = ?`;
    db.query(sql, [project_id, milestone_name, description, due_date, status, milestoneId], callback);
};

const deleteMilestone = (milestoneId, callback) => {
    const sql = `DELETE FROM milestones WHERE milestone_id = ?`;
    db.query(sql, [milestoneId], callback);
};

module.exports = {
    createMilestone,
    getAllMilestones,
    getMilestoneById,
    updateMilestone,
    deleteMilestone,
};
