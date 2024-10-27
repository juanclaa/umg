// routes/progressUpdateRoutes.js
const express = require('express');
const router = express.Router();
const progressUpdateController = require('../controllers/progressUpdateController');

router.post('/', progressUpdateController.createProgressUpdate);
router.get('/', progressUpdateController.getAllProgressUpdates);
router.get('/:id', progressUpdateController.getProgressUpdateById);
router.put('/:id', progressUpdateController.updateProgressUpdate);
router.delete('/:id', progressUpdateController.deleteProgressUpdate);

module.exports = router;
