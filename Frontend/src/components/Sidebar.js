// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar colapsado/expandido
  const [isAdminExpanded, setIsAdminExpanded] = useState(false); // Estado para expandir/collapse Administración

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Cambia el estado al presionar el botón
  };

  const toggleAdmin = () => {
    setIsAdminExpanded(!isAdminExpanded); // Expande o colapsa el submenú de Administración
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className={`fas ${isCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
      </button>

      <h2 className="menu-title">Menú</h2>
      <ul>
        {/*
        <li>
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt"></i>
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>*/}
        <li>
          <Link to="/projects">
            <i className="fas fa-project-diagram"></i>
            {!isCollapsed && <span>Gestión de Proyectos</span>}
          </Link>
        </li>
        <li>
          <Link to="/planning">
            <i className="fas fa-tasks"></i>
            {!isCollapsed && <span>Planificación de Pruebas</span>}
          </Link>
        </li>
        <li>
          <Link to="/testManagement">
            <i className="fas fa-play"></i>
            {!isCollapsed && <span>Ejecución de Pruebas</span>}
          </Link>
        </li>
        <li>
          <Link to="/defects">
            <i className="fas fa-bug"></i>
            {!isCollapsed && <span>Gestión de Defectos</span>}
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <i className="fas fa-chart-line"></i>
            {!isCollapsed && <span>Informes y Métricas</span>}
          </Link>
        </li>
        {/*
        <li>
          <Link to="/integration">
            <i className="fas fa-plug"></i>
            {!isCollapsed && <span>Integración Continua</span>}
          </Link>
        </li>
*/}
        {/* Elemento principal Administración */}
        <li>
          <div className="submenu" onClick={toggleAdmin}>
            <i className="fas fa-cogs"></i> {/* Icono para Administración */}
            {!isCollapsed && <span>Administración</span>}
            <i className={`fas ${isAdminExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
          </div>
          {/* Subelementos Recursos y Task */}
          {isAdminExpanded && (
            <ul className="submenu-items">
              <li>
                <Link to="/projectresources">
                  <i className="fas fa-users"></i> {/* Icono para Recursos */}
                  {!isCollapsed && <span>Recursos a proyectos</span>}
                </Link>
              </li>
              <li>
                <Link to="/tasks">
                  <i className="fas fa-tasks"></i> {/* Icono para Task */}
                  {!isCollapsed && <span>Tareas</span>}
                </Link>
              </li>
              <li>
                <Link to="/resourceManager">
                  <i className="fas fa-tasks"></i> {/* Icono para Task */}
                  {!isCollapsed && <span>Recursos</span>}
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/logout">
            <i className="fas fa-sign-out-alt"></i>
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
