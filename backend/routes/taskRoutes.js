// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { getAllTasks, getCountTasks } = require('../models/taskModel');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/count',taskController.getCountTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
