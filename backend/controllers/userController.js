const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Registro de usuario
const register = (req, res) => {
    console.log(req.body);
    const { username, password, email, role } = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
    // Hash de la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

        const newUser = { username, password: hashedPassword, email, role };

        userModel.createUser(newUser, (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al registrar el usuario' });
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    });
};

// Login de usuario
const login = (req, res) => {
    const { username, password } = req.body;

    userModel.getUserByUsername(username, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

            const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.json({ token });
        });
    });
};

module.exports = { register, login };
