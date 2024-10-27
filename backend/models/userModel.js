const db = require('../db');  // Archivo de conexión que crearemos más adelante

const createUser = (userData, callback) => {
    const { username, password, email, role } = userData;
    const sql = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;
    db.query(sql, [username, password, email, role], callback);
};

const getUserByUsername = (username, callback) => {
    const sql = `SELECT * FROM users WHERE username = ?`;
    db.query(sql, [username], callback);
};

module.exports = {
    createUser,
    getUserByUsername
};
