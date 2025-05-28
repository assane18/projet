// src/services/api.js
export const api = {
  register: async (userData) => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          phone: userData.phoneNumber,
        }),
      });
      const data = await res.json();
      return res.ok
        ? { success: true, userId: data.id }
        : { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  login: async (credentials) => {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      return res.ok
        ? { success: true, token: data.access_token }
        : { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Erreur de communication avec le serveur' };
    }
  },

  requestMFA: async (userId) => {
    return { success: true };
  },

  verifyMFA: async (userId, code) => {
    return { success: true, token: localStorage.getItem('token') };
  },
};
