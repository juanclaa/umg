// routes/projectResourceRoutes.js
const express = require('express');
const router = express.Router();
const projectResourceController = require('../controllers/projectResourceController');

router.post('/', projectResourceController.createProjectResource);
router.get('/', projectResourceController.getAllProjectResources);
router.get('/:id', projectResourceController.getProjectResourceById);
router.put('/:id', projectResourceController.updateProjectResource);
router.delete('/:id', projectResourceController.deleteProjectResource);

module.exports = router;
