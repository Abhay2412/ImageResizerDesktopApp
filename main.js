const path = require('path');
const os = require('os');
const fs = require('fs');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const inDev = process.env.NODE_ENV !== 'production';
const checkMacPlatform = process.platform === 'darwin';

// Helps with creating the main display
function createMainWindow() {
  const mainWindowDisplay = new BrowserWindow({
    title: 'Image Resizer',
    width: inDev ? 1000 : 500,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  //Open the devtools if inside the development environment
  if (inDev) {
    mainWindowDisplay.webContents.openDevTools();
  }

  mainWindowDisplay.loadFile(path.join(__dirname, './client/index.html'));
}
//Create about window here
function createAboutWindow() {
  const aboutWindowDisplay = new BrowserWindow({
    title: 'About Image Resizer',
    width: 400,
    height: 400,
  });
  aboutWindowDisplay.loadFile(path.join(__dirname, './client/about.html'));
}

// The application is ready
app.whenReady().then(() => {
  createMainWindow();

  // Need to implement the custom menu here
  const mainCustomMenu = Menu.buildFromTemplate(menuCustomTemplate);
  Menu.setApplicationMenu(mainCustomMenu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu template
const menuCustomTemplate = [
  ...(checkMacPlatform
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu', // A shortcut for File
  },
  ...(!checkMacPlatform
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

// Respond to ipcRenderer resize
ipcMain.on('image:resize', (e, options) => {
  options.dest = path.join(os.homedir(), 'imageresizer');
  resizeImage(options);
});

// Perform the operation of resizing the image
function resizeImage({ imgPath, width, height, dest }) {
  try {
    
  } catch (error) {
    console.log(error)
  }
}


// Helps with the cross platform for this application since Mac does not close the application when X(Red dot) is pressed
app.on('window-all-closed', () => {
  if (!checkMacPlatform) {
    app.quit();
  }
});
