const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const inDev = process.env.NODE_ENV !== "production";
const checkMacPlatform = process.platform === "darwin";

// Helps with creating the main display
function createMainWindow() {
  const mainWindowDisplay = new BrowserWindow({
    title: "Image Resizer",
    width: inDev ? 1000 : 500,
    height: 600,
  });

  //Open the devtools if inside the development environment
  if (inDev) {
    mainWindowDisplay.webContents.openDevTools();
  }

  mainWindowDisplay.loadFile(path.join(__dirname, "./client/index.html"));
}

// The application is ready
app.whenReady().then(() => {
  createMainWindow();

  // Need to implement the custom menu here
  const mainCustomMenu = Menu.buildFromTemplate(menuCustomTemplate);
  Menu.setApplicationMenu(mainCustomMenu);

  app.on("activate", () => {
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
              label: "About",
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu", // A shortcut for File
  },
  ...(!checkMacPlatform
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
            },
          ],
        },
      ]
    : []),
];

// Helps with the cross platform for this application since Mac does not close the application when X(Red dot) is pressed
app.on("window-all-closed", () => {
  if (!checkMacPlatform) {
    app.quit();
  }
});
