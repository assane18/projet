// src/components/Login.js
import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { setToken } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.login({ email, password });

    if (response.success) {
      setToken(response.token);
      navigate('/verify-otp', { state: { email } });
    } else {
      setError(response.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="SafeExchange Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <p className="error">{error}</p>}
        <p>
          Vous n'avez pas de compte ?{" "}
          <a href="/register" style={{ color: "blue", textDecoration: "underline" }}>
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
}
