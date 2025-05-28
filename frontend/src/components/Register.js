// src/components/Register.js
import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.register({ email, password, phoneNumber });
    if (response.success) {
      navigate('/verify-otp', { state: { email } });
    } else {
      setError(response.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="register-container">
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
        <input
          type="tel"
          placeholder="+33612345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
        {error && <p className="error">{error}</p>}

        <p>
          Vous avez déjà un compte ?{" "}
          <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Se connecter
          </a>
        </p>

      </form>
    </div>
  );
}
