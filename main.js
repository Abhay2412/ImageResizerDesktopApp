const path = require('path');
const { app, BrowserWindow } = require('electron');

const inDev = process.env.NODE_ENV !== 'production';
const checkMacPlatform = process.platform === 'darwin';

function createMainWindow() {
    const mainWindowDisplay = new BrowserWindow({
        title: 'Image Resizer',
        width: inDev ? 1000 : 500,
        height: 600
    });

    //Open the devtools if inside the development environment
    if(inDev) {
        mainWindowDisplay.webContents.openDevTools();
    }

    mainWindowDisplay.loadFile(path.join(__dirname, './client/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      })
});

// Helps with the cross platform for this application since Mac does not close the application when X(Red dot) is pressed
app.on('window-all-closed', () => {
    if (!checkMacPlatform) {
      app.quit()
    }
  })