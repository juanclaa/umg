const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resouceController.js');
const authMiddleware = require('../middlewares/authMiddleware.js'); // Importar el middleware

// Ruta para crear un nuevo recurso (protegida)
router.post('/',  resourceController.createResource);

// Ruta para obtener todos los recursos (protegida)
router.get('/',  resourceController.getAllResources);

// Ruta para obtener un recurso por ID (protegida)
router.get('/:id',  resourceController.getResourceById);

// Ruta para actualizar un recurso por ID (protegida)
router.put('/:id',  resourceController.updateResource);

// Ruta para eliminar un recurso por ID (protegida)
router.delete('/:id',  resourceController.deleteResource);

module.exports = router;
