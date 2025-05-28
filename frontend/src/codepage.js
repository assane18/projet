import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./codepage.css";

const CodePage = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const navigate = useNavigate();

  // Fonction pour envoyer le code quand tous les champs sont remplis
  const handleSubmit = async () => {
    const enteredCode = code.join("");

    try {
      const response = await fetch("http://localhost:5000/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, code: enteredCode }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Code vérifié avec succès !");
        setTimeout(() => navigate("/dashboard"), 2000); // Redirection fictive
      } else {
        setError("Code incorrect. Réessayez.");
      }
    } catch (err) {
      console.error("Erreur de vérification :", err);
      setError("Erreur lors de la vérification du code.");
    }
  };

  // Pour remplir les 4 inputs
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // n'accepte que les chiffres
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Passage au champ suivant auto
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Renvoi du code
  const resendCode = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();
      setSuccess("Code renvoyé !");
    } catch (err) {
      setError("Erreur lors de l'envoi du code.");
    }
  };

  // Au chargement, si pas de numéro stocké, retour login
  useEffect(() => {
    if (!phoneNumber) {
      navigate("/");
    }
  }, [navigate, phoneNumber]);

  return (
    <div className="page-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Entrez le code reçu</h1>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            className="code-box"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Valider</button>
      <a href="/" onClick={(e) => { e.preventDefault(); resendCode(); }}>
        Renvoyer le code
      </a>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="confirmation-message">{success}</div>}
    </div>
  );
};

export default CodePage;
