const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Informe de Progreso de Pruebas por Proyecto
router.get('/progress-by-project', async (req, res) => {
    try {
        const sql = `
             SELECT 
                projects.project_id, 
                projects.project_name,
                COUNT(test_cases.test_case_id) AS total_cases,
                COUNT(test_executions.test_execution_id) AS executed_cases,
                SUM(CASE WHEN test_executions.result = 'Satisfactorio' THEN 1 ELSE 0 END) AS satisfactory,
                SUM(CASE WHEN test_executions.result = 'Fallido' THEN 1 ELSE 0 END) AS failed
            FROM project_management.projects
             left   join project_management.test_plans on  projects.project_id=test_plans.project_id
				left JOIN project_management.test_cases ON test_plans.test_plan_id = test_cases.test_plan_id
			left JOIN project_management.test_executions ON test_cases.test_case_id = test_executions.test_case_id
		GROUP BY projects.project_id, projects.project_name;
        `;
        const [rows] = await db.promise().query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error generating progress report:", error);
        res.status(500).json({ error: "Error generating report" });
    }
});

// 2. Informe de Defectos por Proyecto y Prioridad
router.get('/defects-by-priority', async (req, res) => {
    try {
        const sql = `
            SELECT 
                projects.project_id,
                projects.project_name,
                defects.status,
                defects.severity,
                defects.priority,
                COUNT(defects.defect_id) AS defect_count
            FROM project_management.defects
            JOIN project_management.test_cases ON defects.test_case_id = test_cases.test_case_id
            join project_management.test_plans on test_cases.test_plan_id=test_plans.test_plan_id            
            JOIN project_management.projects ON test_plans.project_id = projects.project_id
            GROUP BY projects.project_id, defects.status, defects.severity, defects.priority;          
            
        `;
        const [rows] = await db.promise().query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error generating defects report:", error);
        res.status(500).json({ error: "Error generating report" });
    }
});

// 3. Informe de Ejecución de Pruebas por Usuario
router.get('/executions-by-user', async (req, res) => {
    try {
        const sql = `
             SELECT 
                resources.resource_id,
                resources.resource_name AS user_name,
                COUNT(test_executions.test_execution_id) AS executions_count,
                SUM(CASE WHEN test_executions.result = 'Satisfactorio' THEN 1 ELSE 0 END) AS satisfactory,
                SUM(CASE WHEN test_executions.result = 'Fallido' THEN 1 ELSE 0 END) AS failed
            FROM project_management.resources
            LEFT JOIN project_management.test_executions ON resources.resource_id = test_executions.executed_by
            GROUP BY   resources.resource_id, resources.resource_name;
        `;
        const [rows] = await db.promise().query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error generating user executions report:", error);
        res.status(500).json({ error: "Error generating report" });
    }
});

module.exports = router;
