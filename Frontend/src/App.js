// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Projects from './pages/Projects';
import Planning from './pages/Planning';
import Execution from './pages/Execution';
import Defects from './pages/Defects';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Integration from './pages/Integration';
import Logout from './pages/Logout';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TaskManager from './pages/TaskManager';
import ResourceManager from './pages/ResourceManager';
import ProjectResources  from './pages/ProjectResources';
import TestManagement from './pages/TestManagement'; // Para proteger las rutas


// Definir el componente que renderiza la aplicación con la lógica de rutas
const AppContent = () => {
  const location = useLocation(); // Obtener la ruta actual después de que el Router está definido

  // Definir rutas en las que no queremos mostrar el Sidebar
  const hideSidebarRoutes = ['/login', '/logout', '/register'];

  return (
    <div style={{ display: 'flex' }}>
      {/* Condicionar el renderizado del Sidebar */}
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

      <div style={{ marginLeft: hideSidebarRoutes.includes(location.pathname) ? '0' : '250px', padding: '20px', width: '100%' }}>
        <Routes>
          {/* Ruta pública de login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />

          {/* Rutas protegidas con PrivateRoute */}
          <Route path="/Dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/projects" element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          } />
          <Route path="/planning" element={
            <PrivateRoute>
              <Planning />
            </PrivateRoute>
          } />
          <Route path="/TestManagement" element={
            <PrivateRoute>
              <TestManagement />
            </PrivateRoute>
          } />
          <Route path="/defects" element={
            <PrivateRoute>
              <Defects />
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          } />
          <Route path="/integration" element={
            <PrivateRoute>
              <Integration />
            </PrivateRoute>
          } />

<Route path="/tasks" element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          } />
<Route path="/projectResources" element={
            <PrivateRoute>
              <ProjectResources />
            </PrivateRoute>
          } />

<Route path="/ResourceManager" element={
            <PrivateRoute>
              <ResourceManager />
            </PrivateRoute>
          } />

          {/* Ruta para cerrar sesión */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

// El componente App debe envolver AppContent con Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
