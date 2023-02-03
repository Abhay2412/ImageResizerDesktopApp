const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow() {
    const mainWindowDisplay = new BrowserWindow({
        title: 'Image Resizer',
        width: 500,
        height: 600
    });

    mainWindowDisplay.loadFile(path.join(__dirname, './client/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();
});