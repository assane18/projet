// src/components/OTPVerification.js
import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Veuillez entrer les 6 chiffres.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/auth/verify-otp', {
        email,
        otp: fullOtp,
      });
      setLoading(false);
      if (res.data.valid) {
        navigate('/dashboard');
      } else {
        setError('Code incorrect.');
        inputs.current[0].focus();
      }
    } catch {
      setLoading(false);
      setError("Erreur lors de la vérification.");
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post('http://localhost:3000/auth/resend-otp', { email });
      setResendMessage('Un nouveau code a été envoyé.');
    } catch {
      setResendMessage("Erreur lors de l'envoi du nouveau code.");
    }
  };

  return (
    <div className="otp-container">
    <img src="/logo.png" alt="SafeExchange Logo" className="logo" />
      <p>Entrez le code reçu par SMS :</p>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            className="otp-box"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={verifyOtp} disabled={loading}>
        {loading ? 'Vérification...' : 'Valider'}
      </button>
      <p className="resend-text" onClick={resendOtp}>Renvoyer le code</p>
      {resendMessage && <p style={{ fontSize: '13px', marginTop: '10px' }}>{resendMessage}</p>}
    </div>
  );
}
