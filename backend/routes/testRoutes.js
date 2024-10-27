// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const testModel = require('../models/testModel');

// Rutas para `test_plans`
router.get('/test-plans', (req, res) => {
    testModel.getAllTestPlans((err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json(results);
    });
});

router.get('/test-plans/:id', (req, res) => {
    testModel.getTestPlanById(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json(result);
    });
});

router.post('/test-plans', (req, res) => {
    testModel.createTestPlan(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test plan created', result });
    });
});

router.put('/test-plans/:id', (req, res) => {
    testModel.updateTestPlan(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test plan updated', result });
    });
});

router.delete('/test-plans/:id', (req, res) => {
    testModel.deleteTestPlan(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test plan deleted', result });
    });
});

// Rutas para `test_cases`
router.get('/test-cases', (req, res) => {
    testModel.getAllTestCases((err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json(results);
    });
});

router.get('/test-cases/:id', (req, res) => {
    testModel.getTestCaseById(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json(result);
    });
});

router.post('/test-cases', (req, res) => {
    testModel.createTestCase(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test case created', result });
    });
});

router.put('/test-cases/:id', (req, res) => {
    testModel.updateTestCase(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test case updated', result });
    });
});

router.delete('/test-cases/:id', (req, res) => {
    testModel.deleteTestCase(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test case deleted', result });
    });
});

// Rutas para `test_executions`
router.get('/test-executions', (req, res) => {
    testModel.getAllTestExecutions((err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.json(results);
    });
});

router.get('/test-executions/:id', (req, res) => {
    testModel.getTestExecutionById(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json(result);
    });
});

router.post('/test-executions', (req, res) => {
    testModel.createTestExecution(req.body, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test execution created', result });
    });
});

router.put('/test-executions/:id', (req, res) => {
    testModel.updateTestExecution(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test execution updated', result });
    });
});

router.delete('/test-executions/:id', (req, res) => {
    testModel.deleteTestExecution(req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else res.json({ message: 'Test execution deleted', result });
    });
});

module.exports = router;
