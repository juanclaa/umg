// routes/defectRoutes.js
const express = require('express');
const router = express.Router();
const defectController = require('../controllers/defectController'); // Importa el controlador de defectos

// Rutas para defectos
router.get('/', defectController.getAllDefects);         // Obtener todos los defectos
router.get('/:id', defectController.getDefectById);      // Obtener un defecto específico
router.post('/', defectController.createDefect);         // Crear un nuevo defecto
router.put('/:id', defectController.updateDefect);       // Actualizar un defecto específico
router.delete('/:id', defectController.deleteDefect);    // Eliminar un defecto específico

module.exports = router;
