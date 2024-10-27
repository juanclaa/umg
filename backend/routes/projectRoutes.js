const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware

// Ruta para crear un nuevo proyecto (protegida)
router.post('/',  projectController.createProject);

// Ruta para obtener todos los proyectos (protegida)
router.get('/',  projectController.getAllProjects);

// Ruta para obtener un proyecto por ID (protegida)
router.get('/:id',  projectController.getProjectById);

router.get ('/status-count',projectController.getProjectsbystatus)

// Ruta para actualizar un proyecto (protegida)
router.put('/:id',  projectController.updateProject);

// Ruta para eliminar un proyecto (protegida)
router.delete('/:id',  projectController.deleteProject);

module.exports = router;
