import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, removeToken } from '../services/auth';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Tableau de bord</h2>
        <button className="logout-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
          Se déconnecter
        </button>
      </div>
      <div className="dashboard-content">
        <div className="welcome-card">
          <div className="welcome-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="welcome-text">
            <h3>Bienvenue !</h3>
            <p>Vous êtes maintenant connecté avec succès à votre compte sécurisé.</p>
          </div>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-lock"></i></div>
            <div className="stat-info">
              <h4>Sécurité</h4>
              <p>Authentification à 2 facteurs active</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-shield-alt"></i></div>
            <div className="stat-info">
              <h4>Dernière connexion</h4>
              <p>Aujourd'hui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;