const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Crée une nouvelle fenêtre
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Active l'intégration Node.js
    },
  });

  // Charge l'application React
  win.loadURL('http://localhost:3000'); // Utilise l'URL du serveur React en développement
}

// Lorsque Electron est prêt, lance la fenêtre
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quitte lorsque toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
