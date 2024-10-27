const express = require('express');
//import express, { json } from 'express';
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const mysql = require('mysql2');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const rRoutes = require('./routes/rRoutes');
const milestonetoneRoutes = require('./routes/milestoneRoutes');
const progressUpdateRoute = require('./routes/progressUpdateRoutes');
const projectResouceRoutes = require('./routes/projectResourceRoutes');
const resourceRoute = require('./routes/ResourceRoutes');
const taskRoute = require('./routes/taskRoutes');
const testRoutes = require('./routes/testRoutes');
const defectRoutes= require('./routes/defectRoutes')
const reportRoutes = require('./routes/reportRoutes');

const whiteList = ['http://localhost:3000', 'http://46.183.114.118:3000','http://umgtestmanagement.s3-website.us-east-2.amazonaws.com']
app.use(cors({
    origin: whiteList , // Dirección exacta del frontend
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true
  }));

app.use(bodyParser.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', projectRoutes);
app.use('/api/resources',rRoutes );
app.use('/api/milestone',milestonetoneRoutes );
app.use('/api/progressUpdate', progressUpdateRoute);
app.use('/api/projectResouce',projectResouceRoutes );
app.use('/api/resource',resourceRoute);
app.use('/api/tasks', taskRoute)
app.use('/api/testplans', testRoutes)
app.use('/api/defectRoutes', defectRoutes)
app.use('/api/reports', reportRoutes);


//const cors = require('cors');
/*app.use(cors())/*
  origin: 'http://46.183.144.118:3000', // Reemplaza con la IP de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true

}));*/

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.get('/', (req, res) => {
    res.send('Test Management System Backend is running');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);


});
